const MenuOption = require('../models/MenuOption');

exports.addMenuOption = async (req, res) => {
        try {
                const { menuOptionName, menuType, menuOptionChoice } = req.body;
                var menuoption = await MenuOption.findOne({menuOptionName})
                if (menuoption) {
                        res.status(400).send('Menu Option Already Exists');    
                }
                else {
                        menuoption = new MenuOption({
                                menuOptionName,
                                menuType,
                                menuOptionChoice,
                        });
                        await menuoption.save();
                        res.send(menuoption);
                }
        } catch (error) {
                console.log(error)
                res.status(500).send('Server Error')
        }
}

exports.listMenuOption = async (req, res) => {
        try {
                var menuoption = await MenuOption.find()
                if (!menuoption) {
                        res.status(400).send('Menu List Not Exists');    
                }
                else {
                        res.send(menuoption);
                }
        } catch (error) {
                console.log(error)
                res.status(500).send('Server Error')
        }
}