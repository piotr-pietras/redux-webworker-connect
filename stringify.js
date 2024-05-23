const a = function normal() {
  return "a";
};

const b = async function asyncNormal() {
  return "b";
};

JSON.stringify(a, (k, v) => {
  console.log(k);
  console.log(v.toString());
});

JSON.stringify(b, (k, v) => {
  console.log(k);
  console.log(v.toString());
});

const c = () => {
  return "c";
};

const d = async () => {
  return "d";
};

JSON.stringify(c, (k, v) => {
  console.log(k);
  console.log(v.toString());
});

JSON.stringify(d, (k, v) => {
  console.log(k);
  console.log(v.toString());
});
