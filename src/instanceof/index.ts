// instanceof实现
const customInstanceof = (instance: any, constructor: Function) => {
  let proto = instance ? instance.__proto__ : null;
  while (proto) {
    if (proto.constructor === constructor) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
}

export { customInstanceof };