const MenuSection = require('../models/MenuSection');

exports.addMenuSection = async (req, res) => {
        try {
                const { menuSectionName, menuSectionDescription } = req.body;
                var menusection = await MenuSection.findOne({menuSectionName})
                if (menusection) {
                        res.status(400).send('Menu Section Already Exists');    
                }
                else {
                        menusection = new MenuSection({
                                menuSectionName, 
                                menuSectionDescription,
                        });
                        await menusection.save();
                        res.send(menusection);
                }
        } catch (error) {
                console.log(error)
                res.status(500).send('Server Error')
        }
}

exports.listMenuSection = async (req, res) => {
        try {
                var menusection = await MenuSection.find()
                if (!menusection) {
                        res.status(400).send('Menu Section List Not Exists');    
                }
                else {
                        res.send(menusection);
                }
        } catch (error) {
                console.log(error)
                res.status(500).send('Server Error')
        }
}