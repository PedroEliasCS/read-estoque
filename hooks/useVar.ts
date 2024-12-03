import { Dispatch, useReducer } from "react";

type Props<T> = {
  initial: T;
  validate?: (value: T) => boolean;
};

/**
 * [valor, se é valido, função para setar o valor, loading]
 */
type PropReturn<T> = [T, boolean, Dispatch<T>, boolean];

interface Value<T> {
  value: T;
  loading: boolean;
}

/**
 * Input hook que retorna o valor, se é valido e a função para setar o valor
 * @Type T tipo do valor
 * @param initial valor inicial
 * @param validate função que valida o valor
 * @returns [valor, se é valido, função para setar o valor, loading]
 */
export default function useVar<T>({
  initial,
  validate,
}: Props<T>): PropReturn<T> {
  const [{ value, loading }, setValue] = useReducer(
    (_: Value<T>, action: T) => {
      return {
        value: action,
        loading: false,
      };
    },
    {
      value: initial,
      loading: true,
    }
  );

  return [value, validate ? validate(value) : true, setValue, loading];
}
