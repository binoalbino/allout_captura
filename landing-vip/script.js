// TODO: substitua pela URL real do seu Webhook (Zapier, Make, n8n, endpoint próprio, etc.)
const WEBHOOK_URL = "https://n8n.lamarketing.com.br/webhook/2cc3fda6-c765-4f01-b3d2-24b2953db76f";

const form = document.getElementById("vip-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

function setStatus(message, state) {
  statusEl.textContent = message;
  statusEl.dataset.state = state || "";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const whatsapp = form.whatsapp.value.trim();
  const consent = form.consent.checked;

  if (!name || !email || !whatsapp) {
    setStatus("Preencha nome, e-mail e WhatsApp para continuar.", "error");
    return;
  }
  if (!consent) {
    setStatus("É preciso aceitar o uso dos seus dados pessoais.", "error");
    return;
  }

  const payload = {
    name,
    email,
    whatsapp,
    consent,
    source: "landing-vip",
    submittedAt: new Date().toISOString(),
  };

  submitBtn.disabled = true;
  setStatus("Enviando...", "");

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Falha no envio (" + response.status + ")");

    form.reset();
    setStatus("Cadastro enviado! Fique de olho no seu e-mail e WhatsApp.", "success");
  } catch (err) {
    setStatus("Não foi possível enviar agora. Tente novamente em instantes.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

// Botão CTA da seção de benefícios leva o usuário até o formulário
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.scrollTo);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.focus({ preventScroll: true });
  });
});
