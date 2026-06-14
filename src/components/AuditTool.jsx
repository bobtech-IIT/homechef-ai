import React, { useState } from 'react';

export default function AuditTool() {
  const [inputText, setInputText] = useState('');
  const [auditResult, setAuditResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuditSubmit = async () => {
    if (inputText.trim().length <= 3) {
      setErrorMsg('Input text must be longer than 3 characters.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setAuditResult('');

    try {
      // 5. Client-Side Integration (React): POST the text payload to /api/audit
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error: ${response.status}`);
      }

      // Apply a final regex safety strip to the output before rendering it to the UI
      const rawOutput = data.auditOutput || '';
      const cleanOutput = rawOutput.replace(/[<>{}\[\]\\]/g, '');

      setAuditResult(cleanOutput);
    } catch (err) {
      console.error('Audit Client Error:', err);
      setErrorMsg(err.message || 'An unexpected error occurred during the audit.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container} className="no-scrollbar animate-fade-in">
      <div style={styles.header}>
        <span style={styles.badge}>HR COMPLIANCE COMPANION</span>
        <h1 className="text-serif" style={styles.title}>Inclusivity & Conduct Auditor</h1>
        <p style={styles.subtitle}>Analyze text for corporate compliance, toxicity, and bias securely using server-side Puter.js completions.</p>
      </div>

      <div style={styles.card} className="glass-card animate-slide-up">
        <h3 style={styles.sectionTitle} className="text-serif">Input Text to Audit</h3>
        <textarea
          style={styles.textarea}
          placeholder="Paste or write corporate communications, emails, policies, or messages here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        {errorMsg && (
          <div style={styles.errorBox}>
            <span style={{ fontSize: '16px' }}>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          style={{
            ...styles.auditBtn,
            background: isLoading ? '#E5E4E7' : 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
          disabled={isLoading}
          onClick={handleAuditSubmit}
        >
          {isLoading ? 'Running Compliance Audit...' : 'Audit Text'}
        </button>
      </div>

      {auditResult && (
        <div style={styles.resultCard} className="glass-card animate-pop">
          <div style={styles.resultHeader}>
            <span style={{ fontSize: '20px' }}>📋</span>
            <h3 style={styles.resultTitle} className="text-serif">Audit Report</h3>
          </div>
          <div style={styles.resultText}>
            {auditResult.split('\n').map((line, index) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={index} style={{ height: '8px' }} />;
              const isHeader = trimmed.startsWith('#') || trimmed.endsWith(':');
              if (isHeader) {
                return (
                  <h4 key={index} style={{ color: '#1A0E08', fontSize: '15px', fontWeight: '800', marginTop: '14px', marginBottom: '8px' }}>
                    {trimmed.replace(/^#+\s*/, '')}
                  </h4>
                );
              }
              const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ');
              if (isBullet) {
                return (
                  <div key={index} style={{ display: 'flex', gap: '6px', margin: '4px 0 4px 12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#E8692A' }}>•</span>
                    <span style={{ fontSize: '13.5px', color: '#4A2C1A', lineHeight: '1.45' }}>{trimmed.replace(/^[-*•]\s*/, '')}</span>
                  </div>
                );
              }
              return (
                <p key={index} style={{ fontSize: '13.5px', color: '#4A2C1A', lineHeight: '1.45', margin: '6px 0' }}>
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    overflowY: 'auto',
    flex: 1,
    background: '#FDF8F2',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '10px'
  },
  badge: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#E8692A',
    letterSpacing: '1.5px',
    background: '#FEF3DC',
    padding: '4px 10px',
    borderRadius: '12px',
    display: 'inline-block',
    marginBottom: '8px'
  },
  title: {
    fontSize: '26px',
    color: '#1A0E08',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '13px',
    color: '#7A5540',
    maxWidth: '480px',
    margin: '0 auto',
    lineHeight: '1.45'
  },
  card: {
    padding: '24px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  sectionTitle: {
    fontSize: '16px',
    color: '#4A2C1A',
    margin: 0,
    fontWeight: '700'
  },
  textarea: {
    width: '100%',
    height: '140px',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    fontSize: '14px',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    background: '#fff',
    resize: 'none',
    color: '#4A2C1A',
    boxSizing: 'border-box'
  },
  auditBtn: {
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 20px',
    fontWeight: '700',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    width: '100%'
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    background: '#FDF2F2',
    border: '1px solid rgba(192, 57, 43, 0.15)',
    borderRadius: '10px',
    color: '#C0392B',
    fontSize: '12.5px'
  },
  resultCard: {
    padding: '24px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    borderLeft: '4px solid #E8692A'
  },
  resultHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  resultTitle: {
    fontSize: '18px',
    color: '#1A0E08',
    margin: 0
  },
  resultText: {
    borderTop: '1px dashed rgba(74, 44, 26, 0.12)',
    paddingTop: '14px',
    textAlign: 'left'
  }
};
