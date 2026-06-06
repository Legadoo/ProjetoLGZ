export function getOrderStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: "Pendente",
    PAID: "Pago",
    PREPARING: "Preparando",
    SHIPPED: "Enviado",
    DELIVERED: "Entregue",
    CANCELED: "Cancelado",
  };

  return labels[status] || status;
}

export function getPaymentStatusLabel(status: string | null | undefined) {
  const labels: Record<string, string> = {
    PENDING: "Aguardando pagamento",
    PAID: "Pagamento confirmado",
    CANCELED: "Pagamento cancelado",
    REFUNDED: "Reembolsado",
  };

  return labels[status || "PENDING"] || "Aguardando pagamento";
}

export function getShippingStatusLabel(status: string | null | undefined) {
  const labels: Record<string, string> = {
    PENDING: "Aguardando envio",
    PREPARING: "Preparando envio",
    SHIPPED: "Enviado",
    DELIVERED: "Entregue",
    CANCELED: "Envio cancelado",
  };

  return labels[status || "PENDING"] || "Aguardando envio";
}

export function getPaymentMethodLabel(method: string | null | undefined) {
  const labels: Record<string, string> = {
    PIX_MANUAL: "Pix manual",
    CARD_MANUAL: "Cartão manual",
    CASH: "Pagamento combinado",
  };

  return labels[method || ""] || "Não informado";
}