import storage from './localStor'

const ToKenKey = 'HM_TOUTIAO_TOKEN'

export const GetToken = () => storage.get(ToKenKey)

export const SetToken = (value) => storage.set(ToKenKey, value)

export const RemoveToken = () => storage.remove(ToKenKey)
