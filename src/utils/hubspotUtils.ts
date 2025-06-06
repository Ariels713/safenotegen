import { SafeFormState } from '@/types/safeForm'

const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
const HUBSPOT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID

export const sendToHubspot = async (formData: SafeFormState) => {
  try {
    // Check if already notified
    if (formData.hubspotNotified) {
      console.log('Already notified HubSpot, skipping...')
      return true
    }

    // Validate required data
    if (!formData.safeType || !formData.companyInfo || !formData.investorInfo) {
      console.error('Missing required data for HubSpot submission')
      return false
    }

    // Validate HubSpot configuration
    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
      console.error('HubSpot configuration is missing')
      return false
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
      { name: 'investment_amount___safe_note_generator', value: formData.investorInfo.investmentAmount?.toString() || '' },
      { name: 'investment_date___safe_note_generator', value: formData.investorInfo.investDate || '' },
      { name: 'entity_type___safe_note_generator', value: formData.investorInfo.entityType || '' },
      { name: 'entity_signatory_title___safe_note_generator', value: formData.investorInfo.authorizedSignatoryTitle || '' },
      { name: 'entity_signatory_email___safe_note_generator', value: formData.investorInfo.authorizedSignatoryEmail || '' },
      { name: 'invest_by_lines___safe_note_generator', value: formData.investorInfo.additionalBylines || '' }
    ]

    // Add SAFE-specific fields
    if (formData.valuationCap) {
      fields.push({ name: 'valuation_cap___safe_note_generator', value: formData.valuationCap.toString() })
    }
    if (formData.discount) {
      fields.push({ name: 'discount___safe_note_generator', value: formData.discount.toString() })
    }
    if (formData.proRataLetter) {
      fields.push({ name: 'pro_rata_letter___safe_note_generator', value: formData.proRataLetter })
    }

    const hubspotData = {
      fields,
      context: {
        pageUri: window.location.href,
        pageName: 'Free SAFE Note Generator | Save Time Fundraising & Legal Fees'
      }
    }

    // Log the data being sent (excluding sensitive information)
    console.log('Sending to HubSpot:', {
      ...hubspotData,
      fields: hubspotData.fields.map(f => ({ name: f.name, value: f.name.includes('email') ? '[REDACTED]' : f.value }))
    })

    // Send to Hubspot
    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hubspotData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('HubSpot API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      })
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const responseData = await response.json()
    console.log('HubSpot submission successful:', responseData)
    return true
  } catch (error) {
    console.error('Error sending data to Hubspot:', error)
    return false
  }
} 