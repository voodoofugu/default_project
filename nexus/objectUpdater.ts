type NewST = Record<string, unknown>;
type S = keyof typeof iStates;

const iStates = {};

// function add or update {}
function iStatesNew(keyToAdd?: NewST, keyToDelete?: S): NewST {
  const newObj: NewST = { ...iStates };

  // add/update
  if (keyToAdd) {
    Object.entries(keyToAdd).forEach(([key, value]) => {
      newObj[key] = value;
    });
  }
  // delete
  if (keyToDelete) {
    delete newObj[keyToDelete];
  }

  // default
  if (Object.keys(newObj).length === 0) {
    newObj.nexus = "Nexus is initialized 💫";
  }
  // save
  Object.assign(iStates, newObj);

  return newObj;
}

const set = (newKey: Record<string, unknown>) => iStatesNew(newKey);
const get = (): NewST => ({ ...iStates });
const remove = (oldKey: S) => iStatesNew(undefined, oldKey);

export const stateChanger = { set, get, remove };

const states = {
  value1: 1,
  value2: "hi",
  value3: true,
};

stateChanger.set(states);
console.log("stateChanger.get()", stateChanger.get());
