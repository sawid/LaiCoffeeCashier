const MenuOption = require('../models/MenuOption');

exports.addMenuOption = async (req, res) => {
        try {
                const { menuOptionName, menuOptionChoice } = req.body;
                var menuoption = await MenuOption.findOne({menuOptionName})
                if (menuoption) {
                        res.status(400).send('Menu Option Already Exists');    
                }
                else {
                        menuoption = new MenuOption({
                                menuOptionName, 
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