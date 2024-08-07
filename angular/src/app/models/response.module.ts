export default interface IResponse<Type> extends Response {
  object: Type;
}
