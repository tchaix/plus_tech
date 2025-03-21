'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import Section from './Section';

export default function HomePage() {
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="PLUS+ Logo"
                width={120}
                height={48}
                className="w-auto h-8"
                priority
              />
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[50vh] pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="mb-8">
              <Image
                src="/images/logo.png"
                alt="PLUS+ Logo"
                width={300}
                height={120}
                priority
              />
            </div>
            <p className="text-xl sm:text-2xl mb-8">{t('slogan')}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Section
              title={t('sections.extraction.title')}
              description={t('sections.extraction.description')}
              className="hover:shadow-xl transition-shadow duration-300"
            />
            <Section
              title={t('sections.analysis.title')}
              description={t('sections.analysis.description')}
              className="hover:shadow-xl transition-shadow duration-300"
            />
            <Section
              title={t('sections.customization.title')}
              description={t('sections.customization.description')}
              className="hover:shadow-xl transition-shadow duration-300"
            />
            <Section
              title={t('sections.licensing.title')}
              description={t('sections.licensing.description')}
              className="hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('team.title')}</h2>
            <p className="text-xl text-gray-600">{t('team.description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-6">
                <Image
                    src="/images/hugo.png"
                    alt={t('team.member3.name')}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('team.member1.name')}</h3>
              <p className="text-blue-600 mb-4">{t('team.member1.role')}</p>
              <p className="text-gray-600">{t('team.member1.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-6" >
                <Image
                    src="/images/thomas.png"
                    alt={t('team.member3.name')}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('team.member2.name')}</h3>
              <p className="text-blue-600 mb-4">{t('team.member2.role')}</p>
              <p className="text-gray-600">{t('team.member2.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-6" >
                <Image
                    src="/images/andrea.png"
                    alt={t('team.member3.name')}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('team.member3.name')}</h3>
              <p className="text-blue-600 mb-4">{t('team.member3.role')}</p>
              <p className="text-gray-600">{t('team.member3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contact.title')}</h2>
            <p className="text-xl text-gray-600">{t('contact.description')}</p>
          </div>
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full px-6 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  status === 'loading'
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {status === 'loading' ? 'Sending...' : t('contact.send')}
              </button>
              {status === 'success' && (
                <p className="text-green-600 text-center mt-4">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center mt-4">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <Image
                src="/images/logo.png"
                alt="PLUS+ Logo"
                width={120}
                height={48}
                className="w-auto h-8 mb-6 brightness-0 invert"
                priority
              />
              <p className="text-gray-400">{t('description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <a
                href="mailto:h.gaugler@plus-technology.co"
                className="text-gray-400 hover:text-white transition-colors"
              >
                h.gaugler@plus-technology.co
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}