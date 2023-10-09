import { configurePersist } from "zustand-persist";

const {persist, purge} = configurePersist({
    rootKey: 'root',
    storage: localStorage
})
export default persist
export {purge}