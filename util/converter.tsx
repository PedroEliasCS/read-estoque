export default {
  /**
   * Data em 2023-10-31T00:00:01.000Z em 05/12/2022
   */
  dataParaExibicao(data: string): string {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  },
};
