import React from 'react';
import { X, Download, FileText } from 'lucide-react';

const PDFViewer = ({ isOpen, onClose, pdfUrl, fileName }) => {
    if (!isOpen) return null;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = fileName || 'documento.pdf';
        link.click();
    };

    return (
        <div className="pdf-viewer-overlay" onClick={onClose}>
            <div className="pdf-viewer-container" onClick={(e) => e.stopPropagation()}>
                <div className="pdf-viewer-header">
                    <div className="pdf-viewer-title">
                        <FileText size={20} />
                        <span>{fileName || 'Documento'}</span>
                    </div>
                    <div className="pdf-viewer-actions">
                        <button className="pdf-action-btn" onClick={handleDownload} title="Descargar">
                            <Download size={20} />
                        </button>
                        <button className="pdf-action-btn close" onClick={onClose} title="Cerrar">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="pdf-viewer-content">
                    <iframe
                        src={pdfUrl}
                        title={fileName}
                        className="pdf-iframe"
                    />
                </div>
            </div>

            <style jsx>{`
                .pdf-viewer-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(12px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--spacing-md);
                    animation: fadeIn 0.3s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .pdf-viewer-container {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    width: 100%;
                    max-width: 900px;
                    height: 90vh;
                    max-height: 800px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .pdf-viewer-header {
                    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
                    padding: var(--spacing-lg);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .pdf-viewer-title {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    color: white;
                    font-weight: 600;
                    font-size: 1rem;
                    flex: 1;
                    min-width: 0;
                }

                .pdf-viewer-title span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .pdf-viewer-actions {
                    display: flex;
                    gap: var(--spacing-sm);
                }

                .pdf-action-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-lg);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    backdrop-filter: blur(10px);
                }

                .pdf-action-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.05);
                }

                .pdf-action-btn.close:hover {
                    background: rgba(239, 68, 68, 0.3);
                }

                .pdf-viewer-content {
                    flex: 1;
                    background: var(--background);
                    overflow: hidden;
                    position: relative;
                }

                .pdf-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    background: white;
                }

                @media (max-width: 768px) {
                    .pdf-viewer-container {
                        height: 95vh;
                        max-height: none;
                        border-radius: var(--radius-lg);
                    }

                    .pdf-viewer-header {
                        padding: var(--spacing-md);
                    }

                    .pdf-viewer-title {
                        font-size: 0.875rem;
                    }

                    .pdf-action-btn {
                        width: 36px;
                        height: 36px;
                    }
                }
            `}</style>
        </div>
    );
};

export default PDFViewer;
