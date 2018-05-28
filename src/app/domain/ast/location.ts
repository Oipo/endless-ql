export interface Line {
  offset: number;
  line: number;
  column: number;
}

export interface Location {
  start: Line;
  end: Line;
}

export const emptyLoc: Location = {
  start:
    {
      offset: 0,
      line: 0,
      column: 0
    },
  end:
    {
      offset: 0,
      line: 0,
      column: 0
    }
};
