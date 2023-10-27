export const host = "http://localhost:4000";

export const routes = {
    getAdocoes: `${host}/adocoes`,
    sendEmail: `${host}/send-email`,
    getStatus: `${host}/status`,
    getAdotantes: `${host}/adotantes`,
    getGatos: `${host}/gatos`,
    createAdocoes: `${host}/adocoes`,
    getResponsavel: `${host}/users`,
    createAdotante: `${host}/adotantes`,
    getAdotanteCpf: (cpf)=>`${host}/adotantes/${cpf}`,
    updateAdocoes: (id) => `${host}/adocoes/${id}`,
    deleteAdocao: (id) => `${host}/adocoes/${id}`,
    getCep: (cep) => `${host}/api/buscacep/${cep}`,
};
