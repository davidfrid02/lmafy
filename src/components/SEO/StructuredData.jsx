import React from 'react'

const StructuredData = () => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Let me ChatGPT that for you',
        description:
            'Share ChatGPT answers easily with your friends and colleagues. Generate shareable links for ChatGPT queries instantly.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        author: {
            '@type': 'Person',
            name: 'David Fried',
        },
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    }

    return (
        <script type="application/ld+json">
            {JSON.stringify(structuredData)}
        </script>
    )
}

export default StructuredData
