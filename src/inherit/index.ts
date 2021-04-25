

function Parent(props) {
  this.x = props.x;
  this.y = props.y;
}

Parent.prototype.add = function() {
  return this.x + this.y;
}

function Child(props) {
  Parent.call(this, props);
}

Child.prototype = Object.create(Parent.prototype);

Child.prototype.plus = function() {
  return 2 * (this.x + this.y);
}


