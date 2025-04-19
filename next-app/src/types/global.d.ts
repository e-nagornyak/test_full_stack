import type en from "../locales/en.json"

export type SearchParams<K extends string = string> = K extends string
  ? Record<K, string | string[] | undefined>
  : Record<string, string | string[] | undefined>

export type AsyncSearchParams = Promise<SearchParams>
export type AsyncParams<T> = Promise<T>

type Messages = typeof en

// // Primitive types (+ Date) are themselves. Or maybe undefined.
// type PartialDeep<T> = T extends string | number | bigint | boolean | null | undefined | symbol | Date
//   ? T | undefined
//   // Arrays, Sets and Maps and their readonly counterparts have their items made
//   // deeply partial, but their own instances are left untouched
//   : T extends Array<infer ArrayType>
//     ? Array<PartialDeep<ArrayType>>
//     : T extends ReadonlyArray<infer ArrayType>
//       ? ReadonlyArray<ArrayType>
//       : T extends Set<infer SetType>
//         ? Set<PartialDeep<SetType>>
//         : T extends ReadonlySet<infer SetType>
//           ? ReadonlySet<SetType>
//           : T extends Map<infer KeyType, infer ValueType>
//             ? Map<PartialDeep<KeyType>, PartialDeep<ValueType>>
//             : T extends ReadonlyMap<infer KeyType, infer ValueType>
//               ? ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>>
//               // ...and finally, all other objects.
//               : {
//                 [K in keyof T]?: PartialDeep<T[K]>;
//               };

declare global {
  type valueof<X> = X[keyof X]
  type Nullable<T> = T | null
  type Maybe<T> = T | null | undefined

  type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>
      }
    : T

  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
