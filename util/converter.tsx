export default {
  /**
   * Data em 2022-12-05 em 05/12/2022
   */
  dataParaExibicao(data: string): string {
    return data.split("-").reverse().join("/");
  },
};
