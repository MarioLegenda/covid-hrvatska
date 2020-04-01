const frontendRepresentation = {
  allSelected: {
    status: true,
    mark: 'W'
  },
  infectedSelected: {
    status: false,
    mark: 'Z',
  },
  notInfectedSelected: {
    status: false,
    mark: 'N',
  },
  selfIsolatedSelected: {
    status: false,
    mark: 'S',
  },
  curedSelected: {
    status: false,
    mark: 'I',
  },
  notDetermined: {
    status: false,
    mark: 'O',
  },
};

export function change(list: string[], exclude: string[] = [], status: boolean) {
  for (const l of list) {
    if (!exclude.includes(l)) {
      this[l] = status;
      frontendRepresentation[l].status = status;
    }
  }
}

export function reset(resetField: string) {
  const keys = Object.keys(frontendRepresentation);
  this[resetField] = true;
  frontendRepresentation[resetField].status = true;

  for (const key of keys) {
    if (key !== resetField) {
      this[key] = false;
      frontendRepresentation[key].status = false;
    }
  }
}

export function getCompleteStatus(): boolean {
  const keys = Object.keys(frontendRepresentation);

  for (const key of keys) {
    if (frontendRepresentation[key].status) {
      return true;
    }
  }

  return false;
}

export function handle(filter: string, status: boolean) {
  change.call(this, [filter], [], status);
}

export function getRepresentationByCode() {
  return Object.values(frontendRepresentation).filter(m => m.mark !== 'W');
}
