const Menu = require('../models/Menu')

exports.addMenu = async (req, res) => {
        try {
                const { menuName, menuPrice } = req.body;
                var menu = await Menu.findOne({menuName});
                if (menu) {
                        res.status(400).send('Menu Already Exists');    
                }
                else {
                        menu = new Menu({
                                menuName,
                                menuPrice,
                        });
                        await menu.save();
                        res.send(menu);
                }
                
        } catch (error) {
                console.log(error)
                res.status(500).send('Server Error')
        }
}