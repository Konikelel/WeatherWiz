export default interface IResponse<Type> {
  object: Type;
  ok: boolean;
  status: number;
}
