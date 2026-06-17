from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.units import mm

name = "KIROSHIN MUNYIPPA"
title = "IT Engineer | Transitioning from Service Desk to Network and Cloud Infrastructure"
contact = "59 Chester Road, Bryanston | 067 677 0889 | Kiroshinm12142@gmail.com"

summary = (
    "IT Engineer transitioning from service desk operations into network and cloud infrastructure roles. "
    "Built a strong technical base through first- and second-line support, incident management, and SLA-driven "
    "service delivery across hardware, software, and connectivity environments. Experienced with ServiceNow, "
    "SolarWinds, and core networking fundamentals including TCP/IP, DNS, DHCP, and VPN troubleshooting. "
    "Now focused on infrastructure growth through CCNA preparation, with a clear goal to contribute in "
    "network support, systems administration, and cloud operations."
)

experience = [
    (
        "Enterprise Outsourcing | IT Engineer | June 2025 - Present",
        [
            "Delivered first- and second-line IT support across hardware, software, and network incidents, consistently restoring service within SLA targets.",
            "Owned the full incident lifecycle from ticket logging to closure, including triage, troubleshooting, user communication, escalation, and verification.",
            "Reduced recurring outages by identifying repeat failure patterns, documenting root-cause evidence, and partnering with infrastructure teams on permanent fixes.",
            "Monitored network and endpoint health using SolarWinds, proactively addressing alerts to prevent user-impacting downtime.",
            "Installed, configured, and maintained desktops, laptops, and peripheral devices to improve workstation reliability and onboarding readiness.",
            "Administered remote access and connectivity support for hybrid users, including VPN troubleshooting and access validation.",
            "Provided on-site support during client visits for infrastructure tasks, device rollouts, and urgent service restoration.",
            "Maintained clear technical documentation for incidents, changes, known errors, and project updates to improve audit readiness and team handovers."
        ]
    ),
    (
        "Advanced Technology | Desktop Support Technician (L1) - Contracted to ABSA | Jan 2024 - Jun 2025",
        [
            "Provided high-volume desktop and end-user support for retail and corporate environments, resolving technical issues while maintaining strong customer satisfaction.",
            "Handled remote troubleshooting through approved support tools, restoring productivity for users with software, login, printing, and connectivity problems.",
            "Managed ServiceNow queues for incidents and service requests, prioritizing workload by impact and urgency to meet operational SLA commitments.",
            "Performed application governance by removing unauthorized software and enforcing endpoint compliance standards.",
            "Configured and supported remote workspace access, including account setup, permissions validation, and secure user enablement.",
            "Contributed to Incident and Problem Management by documenting known errors, escalating repeat issues, and supporting long-term service improvement actions."
        ]
    )
]

skills = [
    "Help desk support", "Software troubleshooting", "Hardware troubleshooting", "Hardware configuration",
    "Wireless networking", "Network configuration", "TCP/IP, DNS, DHCP, VPNs", "Routing and switching basics",
    "Firewalls and network security", "Identity and access management (IAM)",
    "Microsoft Azure administration", "Documentation", "Team collaboration", "Adaptability", "Time management"
]

certs = [
    "CCNA (Currently Learning) - 2026",
    "AWS Cloud Practitioner - Completed 2025",
    "CompTIA A+ - Completed 2025",
    "CompTIA N+ - Completed 2024",
]

def build_ats(path):
    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=14*mm, bottomMargin=14*mm)
    styles = getSampleStyleSheet()
    body = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=10, leading=14)
    h1 = ParagraphStyle('H1', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=16, spaceAfter=3)
    h2 = ParagraphStyle('H2', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=11, spaceBefore=8, spaceAfter=3)

    story = [
        Paragraph(name, h1),
        Paragraph(title, body),
        Paragraph(contact, body),
        Spacer(1, 6),
        Paragraph('PROFESSIONAL SUMMARY', h2),
        Paragraph(summary, body),
        Paragraph('PROFESSIONAL EXPERIENCE', h2),
    ]

    for role, bullets in experience:
        story.append(Paragraph(f"<b>{role}</b>", body))
        for b in bullets:
            story.append(Paragraph(f"- {b}", body))
        story.append(Spacer(1, 3))

    story.extend([
        Paragraph('SKILLS', h2),
        Paragraph(', '.join(skills), body),
        Paragraph('CERTIFICATIONS', h2),
    ])
    for c in certs:
        story.append(Paragraph(f"- {c}", body))

    doc.build(story)


def build_visual(path):
    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=12*mm, rightMargin=12*mm, topMargin=12*mm, bottomMargin=12*mm)
    styles = getSampleStyleSheet()

    dark = colors.HexColor('#111111')
    soft = colors.HexColor('#e5e7eb')
    text = colors.HexColor('#1f2937')

    name_style = ParagraphStyle('Name', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=22, leading=24, textColor=dark)
    head_contact = ParagraphStyle('HeadContact', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, leading=13, textColor=text)

    section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=12,
        textColor=dark
    )
    body = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=9.4, leading=13, textColor=text)
    body_small = ParagraphStyle('BodySmall', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=12.5, textColor=text)

    header = Table([[Paragraph(name, name_style)], [Paragraph(f"<b>{title}</b><br/>{contact}", head_contact)]], colWidths=[186*mm])
    header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 2),
        ('RIGHTPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LINEBELOW', (0,1), (0,1), 1, soft),
    ]))

    left = [
        Paragraph('<b>SUMMARY</b>', section_title),
        Paragraph(summary, body_small),
        Spacer(1, 6),
        Paragraph('<b>CERTIFICATIONS</b>', section_title),
    ]
    for c in certs:
        left.append(Paragraph(f"- {c}", body_small))
    left.extend([Spacer(1, 7), Paragraph('<b>SKILLS</b>', section_title)])
    for s in skills:
        left.append(Paragraph(f"- {s}", body_small))

    right = [Paragraph('<b>EXPERIENCE</b>', section_title)]
    for role, bullets in experience:
        right.append(Paragraph(f"<b>{role}</b>", body))
        for b in bullets:
            right.append(Paragraph(f"- {b}", body_small))
        right.append(Spacer(1, 4))

    content = Table([[left, right]], colWidths=[66*mm, 120*mm])
    content.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (0,0), colors.HexColor('#f9fafb')),
        ('BACKGROUND', (1,0), (1,0), colors.white),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LINEAFTER', (0,0), (0,0), 1, soft),
        ('BOX', (0,0), (-1,-1), 1, soft),
    ]))

    story = [header, Spacer(1, 7), content]
    doc.build(story)

build_ats('/Users/kiroshinmunyippa/Documents/New project/Kiroshin_CV_ATS.pdf')
build_visual('/Users/kiroshinmunyippa/Documents/New project/Kiroshin_CV_Visual.pdf')
print('Created: Kiroshin_CV_ATS.pdf, Kiroshin_CV_Visual.pdf')
