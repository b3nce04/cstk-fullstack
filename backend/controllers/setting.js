import settingModel from '../models/setting.js'

const getSetting = async (req, res, next) => {
    const setting = await settingModel.findOne({where: {key: req.params.key}});
    var result = {value: null}
    if (setting) {
        result = {value: setting.value}
    }
    res.json(result)
}

export {getSetting}