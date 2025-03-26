'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import YouTube, { YouTubeProps } from 'react-youtube';
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  const videoOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
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
      {/* Video Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Découvrez PLUS+ en action</h2>
            <p className="text-xl text-gray-600">Regardez comment notre solution peut transformer votre workflow</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-white p-8">
            <div className="aspect-w-16 aspect-h-9">
              <YouTube
                videoId="x-GE5aA1Q00"
                opts={videoOpts}
                onReady={onPlayerReady}
                className="w-full h-full rounded-xl shadow-lg"
                iframeClassName="w-full h-full rounded-xl"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-transparent pointer-events-none"></div>
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
  <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('contact.title')}</h2>
            <p className="text-xl text-gray-600">{t('contact.description')}</p>
          </div>
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none resize-none"
                    placeholder="Votre message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full px-6 py-4 rounded-lg font-semibold text-white transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    status === 'loading'
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    t('contact.send')
                  )}
                </button>
                {status === 'success' && (
                  <div className="bg-green-50 text-green-800 rounded-lg p-4 mt-4 flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Message envoyé avec succès !
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-50 text-red-800 rounded-lg p-4 mt-4 flex items-center">
                    <svg className="h-5 w-5 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Échec de l'envoi. Veuillez réessayer.
                  </div>
                )}
              </form>
            </div>
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