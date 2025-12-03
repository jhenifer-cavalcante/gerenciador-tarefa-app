export async function formatarData(dataISO: string | undefined) {
  if(dataISO){
    const data = new Date(dataISO);

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    return `${ano}-${mes}-${dia}`;
  }

  return ""
}