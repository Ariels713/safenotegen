import { SafeFormState } from '@/types/safeForm'

export const sendToHubspot = async (formData: SafeFormState) => {
  try {
    // Check if already notified
    if (formData.hubspotNotified) {
      return true
    }

    // Transform data into HubSpot's expected format
    const fields = [
      { name: 'safe_type__safe_note_generator', value: formData.safeType || '' },
      { name: 'company', value: formData.companyInfo.legalName || '' },
      { name: 'state_of_incorporation___safe_note_generator', value: formData.companyInfo.stateOfIncorporation || '' },
      { name: 'state_of_governance___safe_note_generator', value: formData.companyInfo.stateOfGovernance || '' },
      { name: 'company_address___safe_note_generator', value: formData.companyInfo.companyAddress || '' },
      { name: 'entity_signatory_name___safe_note_generator', value: formData.companyInfo.authorizedSignatoryName || '' },
      { name: 'jobTitle', value: formData.companyInfo.authorizedSignatoryTitle || '' },
      { name: 'email', value: formData.companyInfo.authorizedSignatoryEmail || '' },
      { name: 'investor_name___safe_note_generator', value: formData.investorInfo.investorLegalName || '' },
      { name: 'investor_address___safe_note_generator', value: formData.investorInfo.investorAddress || '' },
      { name: 'investment_amount___safe_note_generator', value: formData.investorInfo.investmentAmount || '' },
      { name: 'investment_date___safe_note_generator', value: formData.investorInfo.investDate || '' },
      { name: 'entity_type___safe_note_generator', value: formData.investorInfo.entityType || '' },
      { name: 'entity_signatory_title___safe_note_generator', value: formData.investorInfo.authorizedSignatoryTitle || '' },
      { name: 'entity_signatory_email___safe_note_generator', value: formData.investorInfo.authorizedSignatoryEmail || '' },
      { name: 'invest_by_lines___safe_note_generator', value: formData.investorInfo.additionalBylines || '' }
    ]

    const hubspotData = {
      fields,
      context: {
        pageUri: window.location.href,
        pageName: 'Free SAFE Note Generator | Save Time Fundraising & Legal Fees'
      }
    }

    // Send to Hubspot
    const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/39998325/e1cf0502-7fcb-4259-baee-c824713c2bed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hubspotData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error('Error sending data to Hubspot:', error)
    return false
  }
} 