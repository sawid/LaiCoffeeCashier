const Menu = require('../models/Menu')

exports.addMenu = async (req, res) => {
        try {
                const { menuName, menuPrice, menuSection, menuOption } = req.body;
                var menu = await Menu.findOne({menuName});
                if (menu) {
                        res.status(400).send('Menu Already Exists');    
                }
                else {
                        menu = new Menu({
                                menuName,
                                menuPrice,
                                menuSection,
                                menuOption
                        });
                        await menu.save();
                        res.send(menu);
                }
                
        } catch (error) {
                console.log(error)
                res.status(500).send('Server Error')
        }
}

exports.listMenu = async (req, res) => {
        try {
                var menu = await Menu.find()
                if (!menu) {
                        res.status(400).send('Menu List Not Exists');    
                }
                else {
                        res.send(menu);
                }
        } catch (error) {
                console.log(error)
                res.status(500).send('Server Error')
        }
}