export default interface IStorageContainer<Type> {
    value: Type;
    key: string;
    expiresAt: number | null;
}
