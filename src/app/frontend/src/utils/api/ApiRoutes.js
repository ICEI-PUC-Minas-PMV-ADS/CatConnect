export const host = "http://localhost:4000";

export const routes = {
    getAdocoes: `${host}/adocoes`,
    getUsuario: (phoneNumber) => `${host}/user/celular/${phoneNumber}`,
    putSenha: (id) => `${host}/resetaSenha/${id}`,
    sendSms: `${host}/api/sms`,
    sendEmail: `${host}/send-email`,
    getStatus: `${host}/status`,
    getAdotantes: `${host}/adotantes`,
    getGatos: `${host}/gatos`,
    createAdocoes: `${host}/adocoes`,
    createAdocoesComAdotante: `${host}/adocoesAdotante`,
    getResponsavel: `${host}/users`,
    createAdotante: `${host}/adotantes`,
    getAdotanteCpf: (cpf)=>`${host}/adotantes/${cpf}`,
    getAdocoesId: (id)=>`${host}/adocoes/${id}`,
    getAdotanteId: (id)=>`${host}/adotantesId/${id}`,
    getDetalhesAdotanteAdocao: (id)=>`${host}/detalhes-adotante-adocao/${id}`,
    updateAdocoes: (id) => `${host}/adocoes/${id}`,
    deleteAdocao: (id) => `${host}/adocoes/${id}`,
    getCep: (cep) => `${host}/api/buscacep/${cep}`,
};
