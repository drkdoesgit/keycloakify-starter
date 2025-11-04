<#--
  This file has been claimed for ownership from @keycloakify/email-native version 260007.0.0.
  To relinquish ownership and restore this file to its original content, run the following command:
  
  $ npx keycloakify own --path "email/html/template.ftl" --revert
-->

<#macro emailLayout>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alon - Workplace Equity Platform Invitation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0;padding: 0;font-family: 'Manrope', 'Segoe UI', sans-serif;background-color: #f5f5f5;">
    <table style="max-width: 780px;margin: 0 auto;background-color: #ffffff;padding: 40px;">
        <tbody>
            <!-- Alon Logo -->
            <tr>
                <td>
                    <img src="${url.resourcesUrl}/img/alon-primary-blue.png" alt="Alon Logo" style="width:100px;height:24px;position:relative;margin-bottom:32px;">
                </td>   
            </tr>

            <!-- Title -->
            <tr>
                <td style="border-bottom: 1px solid #e0dfe6;">
                    <!-- Header -->
                    <h1 style="font-family: 'Manrope', 'Segoe UI', sans-serif;font-weight: 600;font-size: 20px;color: #1c1b1e;margin-bottom: 24px;line-height: 28px;margin-top: 0;">Alon - Workplace Equity Platform Invitation</h1>
                </td>
            </tr>

             <tr>
                <td style="font-family: 'Manrope', 'Segoe UI', sans-serif;font-weight: 400;font-size: 14px;color: #464650;line-height: 20px;margin: 0 0 16px 0;padding-top:10px;">
                    <!-- Main Content -->
                    <p><#nested></p>
                </td>
             </tr>        

            <!-- Closing -->
             <tr>
                <td style="font-family: 'Manrope', 'Segoe UI', sans-serif;font-weight: 400;font-size: 14px;color: #464650;line-height: 20px;margin: 0 16px 0;">
                    <p style="margin-top: 24px;margin-bottom: 8px;">Warm regards,</p>
                    <p style="font-weight: 600;color: #1c1b1e;margin-bottom: 32px;">HR Team</p>
                </td>
             </tr>

             <!-- Footer -->
              <tr>
                    <td style="border-top: 1px solid #e0dfe6;padding-top: 10px;margin-top: 32px;">
                        <p style="font-size: 12px;color: #79747e;line-height: 16px;margin-bottom: 8px;font-style: italic;">Please do not reply to this email. This account is not monitored.</p>
                        <p style="font-size: 12px;color: #79747e;line-height: 16px;margin-bottom: 16px;">This email was sent to <span style="font-weight: 500;color: #1c1b1e;">${user.email}</span></p>
                    </td>
              </tr>

            <!-- Footer Links -->
             <tr>
                <td>  
                    <span style="font-family: 'Manrope', 'Segoe UI', sans-serif;font-weight: 600;font-size: 12px;color: #1c1b1e;padding-right:10px">Alon</span>
                    <a href="https://way.alonwork.com/support" style="font-family: 'Manrope', 'Segoe UI', sans-serif;font-weight: 400;font-size: 12px;color: #1050e0;text-decoration: none;" target="_blank" rel="noopener noreferrer">Help Center</a>
                    <span style="color: #c7c5d2;padding: 0 10px 0 10px">|</span>
                    <a href="https://way.alonwork.com/privacy-policy" style="font-family: 'Manrope', 'Segoe UI', sans-serif;font-weight: 400;font-size: 12px;color: #1050e0;text-decoration: none;" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </td>
             </tr>
        </tbody>
    </table>
</body>
</html>
</#macro>
