import { Linkedin, MessageCircle, Download } from 'lucide-react'
import { profile } from '../data'

export default function Contact() {
  const whatsappUrl = profile.phone
    ? 'https://wa.me/' + profile.phone.replace(/\D/g, '')
    : ''

  return (
    <div className="contact">
      <p className="contact__text stagger-child">
        Estou aberto a novas oportunidades e parcerias na área de{' '}
        engenharia civil e infraestrutura. Não hesite em entrar em contato{' '}
        através do LinkedIn ou solicitar o currículo em PDF.
      </p>
      <div className="contact__actions stagger-child">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--primary stagger-child">
          <Linkedin size={18} />
          LinkedIn
        </a>
        {whatsappUrl && (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline stagger-child">
            <MessageCircle size={18} />
            WhatsApp
          </a>
        )}
        <button type="button" className="btn btn--outline stagger-child" onClick={() => window.downloadPDF?.()}>
          <Download size={18} />
          Baixar Currículo
        </button>
      </div>
    </div>
  )
}
