'use client';
import { useState, useRef } from 'react';
import Image from 'next/image'; 
export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [concerns, setConcerns] = useState({
    unclear: false,
    paywall: false,
    lowBenefit: false,
  });
  const [otherComment, setOtherComment] = useState('');

  const limitRef = useRef(null);
  const brainrotRef = useRef(null);
  const pricingRef = useRef(null);

  const handleCheckboxChange = (key) => {
    setConcerns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const FORM_ID = '1FAIpQLScClwTgsTS2KtP8ARF9uWXg6EimAJlZkPRmcUM-AhExGOPerg';
      const EMAIL_ENTRY_ID = '62852513';
      const CHECKBOX_ENTRY_ID = '1032374180';
      const OTHER_ENTRY_ID = '2140248438';  
      const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
      
      const formData = new FormData();
      formData.append(`entry.${EMAIL_ENTRY_ID}`, email);
       if (concerns.unclear) {
        formData.append(`entry.${CHECKBOX_ENTRY_ID}`, 'どんなサイトかわからない');
      }
      if (concerns.paywall) {
        formData.append(`entry.${CHECKBOX_ENTRY_ID}`, '課金のハードルが高い');
      }
      if (concerns.lowBenefit) {
        // "読者側" を "ユーザー側" に修正（UIと一致させる）
        formData.append(`entry.${CHECKBOX_ENTRY_ID}`, 'ユーザー側のメリットが小さい');
      }
      if (otherComment.trim()) {
  formData.append(`entry.${OTHER_ENTRY_ID}`, otherComment);
}
      await fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
      
      setSubmitted(true);
      setEmail('');
      setConcerns({ unclear: false, paywall: false, lowBenefit: false });
      setOtherComment('');
    } catch (err) {
      console.error('送信エラー:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const shareText = 'ふぁいぶの～と 月5記事!';
  const shareUrl = 'https://www.5-note.com';

  const shareOnX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnThreads = () => {
    const url = `https://threads.net/intent/post?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
           <Image src="/favicon.ico" alt="5-note ロゴ" width={32} height={32} />
            <span className="text-white text-xl font-bold">ふぁいぶの～と</span>
          </div>
          
          <a
            href="https://note.com/5_note_notekyoku"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition text-sm flex items-center gap-2"
          >
            <span>📝 AIがあるnoteでも宣伝中。</span>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            クリエイターがたった一つだけ伝えるサイト。<br/>
            <span className="text-blue-400">高品質なnote</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-4">
            月5記事だけ。読むのも月150記事まで。
          </p>
          <p className="text-lg text-gray-400 mb-8">
            記事厳選版のnote。
            AIに埋もれない、本当に面白いコンテンツとの出会い。<br />
            クリエイター同士が支え合う「商店街型」プラットフォーム。
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={shareOnX}
              className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Xでシェア
            </button>
            
            <button
              onClick={shareOnThreads}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.186 3.012C7.23 3.012 3.318 6.924 3.318 11.88s3.912 8.868 8.868 8.868 8.868-3.912 8.868-8.868-3.912-8.868-8.868-8.868zm3.564 9.612c-.456.456-1.08.684-1.848.684-.768 0-1.392-.228-1.848-.684s-.684-1.08-.684-1.848.228-1.392.684-1.848 1.08-.684 1.848-.684 1.392.228 1.848.684.684 1.08.684 1.848-.228 1.392-.684 1.848z"/>
              </svg>
              Threadsでシェア
            </button>
          </div>

          {!submitted ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                事前登録受付中
              </h2>
              <p className="text-gray-300 mb-6">
                ベータ版リリース時にお知らせします
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="text-left space-y-3">
                  <p className="text-white text-sm font-medium mb-3">
                    サイトにほしい機能・不安点（複数選択可）
                  </p>
                  
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={concerns.unclear}
                      onChange={() => handleCheckboxChange('unclear')}
                      className="mt-1 w-4 h-4 rounded border-white/30 bg-white/20 text-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-300 text-sm group-hover:text-white transition">
                      どんなサイトかわからない
                    </span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={concerns.paywall}
                      onChange={() => handleCheckboxChange('paywall')}
                      className="mt-1 w-4 h-4 rounded border-white/30 bg-white/20 text-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-300 text-sm group-hover:text-white transition">
                      課金のハードルが高い
                    </span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={concerns.lowBenefit}
                      onChange={() => handleCheckboxChange('lowBenefit')}
                      className="mt-1 w-4 h-4 rounded border-white/30 bg-white/20 text-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-300 text-sm group-hover:text-white transition">
                      ユーザー側のメリットが小さい
                    </span>
                  </label>
                </div>
                <div className="text-left">
                  <label className="block">
                    <span className="text-white text-sm font-medium mb-2 block">その他の質問・コンタクトはこちらから</span>
                    <textarea
                      value={otherComment}
                      onChange={(e) => setOtherComment(e.target.value)}
                      placeholder="ご質問やご意見があればお聞かせください"
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '送信中...' : '事前登録する'}
                </button>
              </form>
              
              <p className="text-gray-500 text-xs mt-4">
                登録いただいた情報は、サービス改善とベータ版の案内のみに使用します。
              </p>
            </div>
          ) : (
            <div className="bg-green-500/20 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-green-500/50">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                登録完了！
              </h2>
              <p className="text-gray-300 mb-4">
                貴重なご意見ありがとうございます。<br />
                ベータ版リリース時にご連絡します。
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                別のメールアドレスで登録する
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <button
              onClick={() => scrollToSection(limitRef)}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition cursor-pointer text-left"
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-white mb-2">月5記事まで</h3>
              <p className="text-gray-400">
                量より質。本当に書きたいものだけを。
              </p>
              <p className="text-blue-400 text-sm mt-4">クリックして詳細を見る ↓</p>
            </button>
            
            <button
              onClick={() => scrollToSection(brainrotRef)}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition cursor-pointer text-left"
            >
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-2">ブレインロット防止</h3>
              <p className="text-gray-400">
                月150記事まで。時間を奪われない設計。
              </p>
              <p className="text-blue-400 text-sm mt-4">クリックして詳細を見る ↓</p>
            </button>

            <button
              onClick={() => scrollToSection(pricingRef)}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition cursor-pointer text-left"
            >
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">閲覧5円〜</h3>
              <p className="text-gray-400">
                クリエイターを直接支援。商店街のような温かさ。
              </p>
              <p className="text-blue-400 text-sm mt-4">クリックして詳細を見る ↓</p>
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-32 space-y-32">
          <section ref={limitRef} className="scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
                  月5記事制限
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  量より質。<br />本当に書きたいものだけを。
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  AIで大量生産された記事に埋もれていませんか？ ふぁいぶのーと では、クリエイターが月に投稿できるのは5記事だけ。この制限が、本当に伝えたいことだけを厳選する文化を生み出します。
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>量産ではなく、熟考された質の高いコンテンツ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>クリエイターの「書くこと」への疎外感を解消</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>読者にとっても、選びやすく読みやすい</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-white/10">
                <div className="bg-white/10 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">今月の投稿</span>
                    <span className="text-blue-400 font-bold">3 / 5</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    あと2記事投稿できます。厳選して書いてね
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section ref={brainrotRef} className="scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-white/10 order-2 md:order-1">
                <div className="bg-white/10 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">今月の閲覧</span>
                    <span className="text-purple-400 font-bold">87 / 150</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{width: '58%'}}></div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    残り63記事。本当に読みたいものを選んでね
                  </p>
                </div>
              </div>
              <div className="text-left order-1 md:order-2">
                <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
                  閲覧制限
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  時間を奪われない。<br />ブレインロットを防ごう
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  SNSで無限スクロールしてない？ ふぁいぶのーと では、月に閲覧できるのは150記事まで。この制限が、本当に読みたいコンテンツを選ぶ意識を育てます。
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span>虚無の時間を削減、知的刺激の？読書体験へ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span>質の低いコンテンツに時間を奪われない</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span>「読んだ記事」に価値を感じられる設計</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section ref={pricingRef} className="scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm font-medium mb-4">
                  商店街型経済
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  5円から。<br />クリエイターを&quot;直接支援&quot;。
                </h2>
                
                <p className="text-gray-300 text-lg mb-6">
                  記事を読むのに5円。おひねりで追加支援も。noteのように一部のスターだけが稼ぐのではなく、商店街のようにクリエイター同士がお互いを支え合う経済圏を目指します！
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>20人に読まれれば100円＝コーヒー代に</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>&rdquo;無限のいいね&rdquo;より&rdquo;5円&rdquo;の方が嬉しい</span>
                    
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>ユーザー＝クリエイターの相互関係</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl p-8 border border-white/10">
                <div className="bg-white/10 rounded-lg p-6 space-y-4">
                  <h3 className="text-white font-bold text-lg mb-4">今月の収益</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">閲覧料</span>
                      <span className="text-white font-bold">¥350</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">おひねり</span>
                      <span className="text-white font-bold">¥240</span>
                    </div>
                    <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                      <span className="text-white font-medium">合計</span>
                      <span className="text-green-400 font-bold text-xl">¥590</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-4">
                    70人の読者が支援してくれています
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-500 mt-20">
        <p>© 2025 5-note.com All rights reserved. </p>
        <p>ふぁいぶのーと！</p>
      </footer>
    </div>
  );
}