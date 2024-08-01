import { create } from 'zustand'

export const itemStore = create(() => ({
    filterData: null,
}))


export const AddFilterItems = (items) => itemStore.setState({ filterData: items })