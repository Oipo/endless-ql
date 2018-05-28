export interface Line {
  offset: number;
  line: number;
  column: number;
}

export interface Location {
  start: Line;
  end: Line;
}

export const locationToReadableMessage = function(location: Location): string {
  return ` between line ${location.start.line}` +
    ` and col ${location.start.column} and line ${location.end.line} and col ${location.end.column}`;
};

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
