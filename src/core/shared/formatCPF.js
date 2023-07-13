function formatGroup(cpfGroup, groupLength) {
  const specialChar = groupLength > 7 ? "-" : ".";
  return (
    cpfGroup.substring(0, groupLength) +
    specialChar +
    cpfGroup.substring(groupLength)
  );
}

export function formatCPF(cpf) {
  if (!cpf) {
    return cpf;
  }
  let formattedCPF = cpf.replace(/[^\d]/g, "");
  if (formattedCPF.length > 3) {
    formattedCPF = formatGroup(formattedCPF, 3);
  }
  if (formattedCPF.length > 7) {
    formattedCPF = formatGroup(formattedCPF, 7);
  }
  if (formattedCPF.length > 11) {
    formattedCPF = formatGroup(formattedCPF, 11);
  }

  return formattedCPF.substring(0, 14);
}
