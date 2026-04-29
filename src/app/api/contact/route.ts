import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { ime, telefon, poruka } = await req.json()

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'slavisaarsenijevic05@gmail.com',
      subject: `Nova poruka od ${ime}`,
      text: `Ime: ${ime}\nTelefon: ${telefon}\nPoruka: ${poruka}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ ok: false, error: error.message }, { status: 500 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Unexpected error:', err)
    return Response.json({ ok: false }, { status: 500 })
  }
}