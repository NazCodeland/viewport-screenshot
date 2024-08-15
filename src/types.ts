// 
export interface Dimension {
  deviceType: string;
  deviceName: string;
  width: number;
  height: number;
  zoom: number;
}


export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

type Intersected = {
  a: string;
} & {
  b: number;
} & {
  c: boolean;
};


export type Intersected = Prettify<
  {
    a: string;
  } & {
    b: number;
  } & {
    c: boolean;
  }
>;