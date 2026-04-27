/* ========================================
   Condition Labo — Split Cinematic Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Lite YouTube (click-to-load) --- */
  document.querySelectorAll('.lite-youtube').forEach(el => {
    const id = el.dataset.id;
    // Set thumbnail background
    el.style.backgroundImage = `url("https://i.ytimg.com/vi/${id}/hqdefault.jpg")`;
    el.addEventListener('click', () => {
      const title = el.dataset.title || 'YouTube video';
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;';
      el.replaceWith(iframe);
    });
  });

  /* --- Header scroll --- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* --- Hamburger menu --- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  if (hamburger && mobileNav) {
    const closeMenu = () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    };
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('active');
      if (isOpen) { closeMenu(); } else {
        hamburger.classList.add('active');
        mobileNav.classList.add('active');
        if (mobileBackdrop) mobileBackdrop.classList.add('active');
      }
    });
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* --- Fade-in on scroll --- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* --- Count-up animation for stats --- */
  const countEls = document.querySelectorAll('[data-count]');
  if (countEls.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const duration = 1500;
          const start = performance.now();

          function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => countObserver.observe(el));
  }

  /* --- Staff Modal --- */
  const staffData = {
    sonobe: {
      name: '園部 俊晴',
      nameEn: 'Toshiharu Sonobe',
      photo: './images/images20251021163054.jpg',
      meta: {
        '出身': '神奈川県横浜市',
        '性格': '明るい努力家、働きもの',
        '趣味': '料理、ゴルフ、釣り、登山、マラソン（フルマラソン10回完走）、読書（ワンピース愛好家）、スキー、ラーメン（Rahaラーメンクラブの部長）、温泉（全県名湯制覇）、妻と会話すること',
        '信条': '両親が喜んでくれること、我が子に誇れること、妻をイタリア人のごとく大切にすること、社会に貢献できること、自分のゴールに向かっていること、これらを満たす生き方'
      },
      greeting: 'はじめまして、所長の園部俊晴です。コンディション・ラボでは痛みや様々な症状を持つ患者様などを一人でも多くサポートしたいです。長年、最先端の治療を行っている病院で働いてきた経験を活かして、そこで得た知識・技術を元に最新の研究成果などを取り入れながら、オーダーメイドのインソールを用いてよりよい生活ができるように手助けをさせていただきます。',
      bio: '膝・足・股関節など、下肢全般の領域の専門家であるとともに、故・入谷誠の一番弟子。一般人からスポーツ選手まで幅広いレベルの患者を対象とし、多くの一流アスリートや著名人などの療術を手掛ける。身体の運動連鎖や歩行に関する研究および文献が多数あり、著書も多い。新聞、雑誌、テレビなどのメディアにも多く取り上げられる。また、運動連鎖を応用した概念は、専門家からの評価が高く全国各地で講演活動を行う。',
      qualifications: '理学療法士、コンディション・ラボ所長、運動と医学の出版社 代表取締役社長、臨床家のための運動器研究会代表、身体運動学的アプローチ研究会代表理事、入谷式足底板インストラクター、実践リハビリ研究会学術顧問、文京学院大学保健医療科学研究科（大学院）特別講師、昭和大学保健医療学部理学療法科客員講師',
      career: [
        '平成3年4月: 関東労災病院リハビリテーション科勤務',
        '平成3年: 理学療法士（国家資格）取得',
        '平成3年より: 入谷誠の師事のもと入谷式インソール（足底板）を学ぶ。以後、関東労災病院で26年間勤務',
        '平成29年3月: 26年間勤務した関東労災病院を退職',
        '平成29年4月: コンディション・ラボを開業。同時に(株)運動と医学の出版社 代表取締役社長に就任'
      ],
      authored: [
        '「リバウンドしないから、これが最後のダイエット」2026/4',
        '「園部俊晴の臨床『徒手療法ガイドブック』Ⅱ 膝関節・下腿・足関節・足部編」2025/12',
        '「ねこ背病 放置する人から老いていく」運動と医学の出版社 2025/8',
        '「健康寿命のためのからだのトリセツ」2025/5',
        '「園部俊晴の臨床『徒手療法ガイドブック』腰部・殿部・股関節・大腿編」2024/12',
        '「園部式脚の痛み・しびれ改善メソッド」2024/10',
        '「ひざ痛探偵 謎はすべて解けた！」2024/8',
        '「園部式足底筋膜炎改善メソッド」彩図社 2024/7',
        '「園部式首の痛み改善メソッド」2024/6',
        '「一流の臨床思考」2024/3',
        '「園部式脊柱管狭窄症改善メソッド」彩図社 2023/8',
        '「園部式歩行改善メソッド」2023/4',
        '「園部式ひざ痛改善メソッド」彩図社 2023/1',
        '「スポーツ外傷・障害に対する術後のリハビリテーション 改訂第3版」2022/10',
        '「臀筋ほぐし」PHP研究所 2022/8',
        '「園部俊晴の臨床『膝関節』」2021/2',
        '「入谷誠の理学療法 評価と治療の実際」運動と医学の出版社 2020/5',
        '「お尻の痛み・しびれ 1分でよくなる 最新最強」わかさ夢ムック 2020/2',
        '「つらいひざ痛が1分でよくなる！ ひざ下リリース」わかさ夢MOOK 2019/10',
        '「リハビリの先生が教える！健康寿命を10年延ばすからだのつくり方」2017/2',
        '「効果的な文章の書き方 入門講座」運動と医学の出版社 2013/3'
      ],
      authoredMore: true,
      edited: [
        '「スポーツ外傷・障害に対する術後のリハビリテーション」運動と医学の出版社 2010（内山英司・岩噌弘志監修、園部俊晴・他著）',
        '「体幹と骨盤の評価と運動療法」運動と医学の出版社 2018（鈴木俊明監修、大沼俊博・園部俊晴編）'
      ],
      editedMore: true,
      papers: [
        '園部俊晴：外反母趾について．神奈川県理学療法士会会報20：23-27，1993．',
        '園部俊晴、入谷誠ほか：外反母趾．臨床スポーツ医学10，臨時増刊号:391-394，1993．',
        '園部俊晴：下肢のスポーツ障害と足．神奈川県理学療法士会会報21：25-28，1994．',
        '園部俊晴：足関節．スポーツトレーナーマニュアル，武藤芳照、村井貞夫、鹿倉二郎（編），南光堂，p346-354，1996',
        '園部俊晴：外反母趾．スポーツ外傷・障害の理学療法，臨床スポーツ医学編集委員会（編），文光堂，p393-396，1997',
        '園部俊晴：足関節・足趾．アスレチックリハビリテーション，福林徹、米田稔（編），南光堂，p144-148，1998',
        '夏山元伸・園部俊晴：当院における足部疲労骨折のスポーツ復帰に向けた保存療法．臨床スポーツ医学17:490-491，2000．',
        '園部俊晴：足関節捻挫に対する理学療法．スポーツ傷害の理学療法，理学療法MOOK９，福井勉、小柳磨毅（編），三輪書店p122-129，2001',
        '園部俊晴、小柳磨毅：足関節靭帯損傷に対する術前・術後の理学療法．理学療法19:734-738，2002．',
        '園部俊晴、勝木秀治・他：大腿直筋の筋活動パターン特性ー遂行動作の違いが二関節筋の部位別筋活動に与える影響ー．理学療法学．29（7）：245～249．2002',
        '園部俊晴：変形性膝関節症の歩行特性について-後足部アライメントに着目して．平成14年度労働福祉事業団医学研究報告集．56-59．2003.3.1',
        '内田竜生、園部俊晴：月刊ろうさい 痛みをとるリハビリテーション 急性腰痛症 7月号 2005',
        '内田竜生、園部俊晴：月刊ろうさい 痛みをとるリハビリテーション 筋・筋膜性腰痛症 8月号 2005',
        '内田竜生、園部俊晴：月刊ろうさい 痛みをとるリハビリテーション 腰椎椎間板ヘルニア 9月号 2005',
        '内田竜生、園部俊晴：月刊ろうさい 痛みをとるリハビリテーション 足底筋膜炎 1月号 2006',
        '内田竜生、園部俊晴：月刊ろうさい 痛みをとるリハビリテーション 扁平足 2月号 2006',
        '内田竜生、園部俊晴：月刊ろうさい 痛みをとるリハビリテーション 足関節捻挫 3月号 2006',
        '内田竜生、園部俊晴：月刊ろうさい 痛みをとるリハビリテーション 腰椎分離症 7月号 2006',
        '内田竜生、園部俊晴：月刊ろうさい 痛みをとるリハビリテーション 腰部脊柱管狭窄症 9月号 2006',
        '内田竜生、園部俊晴：月刊ろうさい 痛みをとるリハビリテーション 変形性股関節症 12月号 2006',
        '内山英司、園部俊晴：アキレス腱断裂に対する縫合術後の筋力トレーニング．臨スポVol23．No2．159-165，2006',
        '園部俊晴：アキレス腱断裂、アキレス腱炎のリハビリテーションについて Sportsmedicine No91．14，2007',
        '園部俊晴・他：骨盤と身体重心の位置変化が体幹アライメントに及ぼす影響．理学療法25：455-461．2008．',
        '園部俊晴、内山英司：下腿・足関節・足部の成長期傷害とリハビリテーション．Med Reha96：59-64．2008．',
        '園部俊晴：運動連鎖を応用した下肢障害の理学療法．静岡県理学療法士会学術誌19：52-58．2008．',
        '園部俊晴：変形性膝関節症における歩行時の矢状面動作分析（健常人との比較）．平成20年度病院機能向上研究結果報告書．独立行政法人労働者健康福祉機構．4：233-252，2009',
        '園部俊晴・他：足関節捻挫に対する理学療法．スポーツ傷害の理学療法，理学療法MOOK９第2版，福井勉、小柳磨毅（編），三輪書店pp189-198，2009',
        '園部俊晴：足部・足関節疾患に対するテーピング活用．理学療法26：1341-1347，2009',
        '園部俊晴：効果的な文章の書き方入門．運動と医学の出版社2010．',
        '園部俊晴：運動連鎖を応用した下腿・足関節・足部のスポーツ外傷と障害．スポーツメディスン 2010．',
        '園部俊晴：運動連鎖を応用した下腿・足関節・足部のスポーツ外傷と障害．PTジャーナル 45：739-747．2011．',
        '園部俊晴：足関節靱帯損傷に対するリハ＆リコの実際．下肢スポーツ外傷のリハビリテーションとリコンディション．文光堂 2011．pp173-187',
        '園部俊晴：運動連鎖を応用した動作分析．臨床スポーツ医学29：23-28．文光堂 2012．',
        '園部俊晴：ランナーへの足底挿板療法．ランニング障害のリハビリテーションとリコンディショニング 文光堂 2012，pp213-220',
        '園部俊晴：サッカーにおける筋腱損傷の治療から復帰の実際 スポーツ復帰までのリハビリテーションと再発防止(アキレス腱損傷)（会議録）日本整形外科スポーツ医学会雑誌(1340-8577)32巻4号 Page576(2012.08)',
        '園部俊晴：動画の活用 プレゼンテーションのための動画の活用法 理学療法ジャーナル巻12号 Page1095-1101(2012.12)',
        '園部俊晴：足部・足関節の理学療法．骨関節理学療法学 編集：吉尾雅春／小柳磨毅 医学書院 2013年02月',
        '園部俊晴：下腿・足関節・足部の理学療法．理学療法京都42：37-40．2013．',
        '園部俊晴：運動連鎖からみた動作分析の評価と治療 理学療法学 40(suppl-3): 62-62, 2013.',
        '園部俊晴・他：スポーツ外傷・障害に対する術後のリハビリテーション 改訂版．運動と医学の出版社2013．',
        '園部俊晴：シンスプリントに対するランニングphaseに応じたインソール．スポーツ障害 理学療法ガイド 臨床スポーツ医学臨時増刊号31：311-315，2014．',
        '園部俊晴：下肢機能障害のスタンダードテクニック 理学療法学 40(suppl-3): 62-62, 2015.',
        '園部俊晴：下肢機能障害のスタンダードテクニック（臨床推論に基づく理学療法）．理学療法学43suppl.1：66-68 ,2016．',
        '園部俊晴：皮膚の誘導とインソール, テープ, エクササイズで対応. 姿勢と身体のバランスを改善する スポーツメディスン 30(3): 9-14, 2018.',
        '園部俊晴：皮膚への注目 皮膚へのアプローチで何が変わるか スポーツメディスン 30(3): 1-1, 2018.',
        '園部俊晴：膝関節の理学療法 仮説検証作業の実際 DVD（2枚組）運動と医学の出版社2018．',
        '園部俊晴：セラピストの手の使い方 治療技術の向上のために スポーツメディスン 31(4): 1-1, 2019.',
        '高橋弦・園部俊晴：腰痛の原因と治療．運動と医学の出版社2019．'
      ],
      papersMore: true,
      awards: [
        '平成18年6月：秩父宮スポーツ医科学賞 奨励賞'
      ],
      media: {
        'TV': '「ニースの森（TBS）」「発掘あるある大辞典（フジテレビ）」「バースデイ（TBS）」「助けて！きわめびと（NHK総合）」「なないろ日和（テレ東）」「くりぃむしちゅーのハナタカ！優越館（テレ朝）」 ほか',
        '新聞・雑誌': '朝日新聞、読売新聞、報知新聞、日経ヘルスプルミエ、わかさ、壮快、アルバ、週刊ポスト ほか'
      },
      lectures: '日本理学療法士協会全国研修会、神奈川・熊本・京都・沖縄・静岡・大阪・和歌山など各都道府県理学療法士協会、川崎市整形外科会など多数。文京学院大学（大学院）特別講師、昭和大学保健医療学部 客員講師。'
    },
    tsuchiya: {
      name: '土屋 元明',
      nameEn: 'Genmei Tsuchiya',
      photo: './images/images20251021163319.png',
      meta: {
        '出身': '神奈川県横須賀市',
        '性格': '元気で明るい',
        '肩書き': '動きのこだわりテーション 代表',
        '趣味': '体について学ぶこと',
        '信条': '動きの質を高めることは人生の質を高める',
        '特技': '嫌なことも寝たら忘れられる',
        '好きな言葉': '人生の目的は幸福を体験する事である'
      },
      qualifications: '理学療法士（国家資格）、呼吸療法認定士、Orthomolecular Nutrition Professional、ロコモ予防運動指導士兼講師',
      career: [
        '平成20年4月: 医療法人沖縄徳洲会 湘南鎌倉総合病院 リハビリテーション科 入職',
        '平成26年4月: 医療法人大樹会 ふれあい鎌倉ホスピタル リハビリテーション科 入職',
        '平成28年5月: 動きのこだわりテーションを開業',
        '平成31年4月: コンディション・ラボ 非常勤',
        '平成29年〜令和2年: 日本メディカルフィットネス研究会常任理事'
      ],
      authored: [
        '「ひざのねじれをとればひざ痛は治る」2020',
        '「臨床で結果を出し続ける治療戦略」2021',
        '「肩と首はもまずにつまんで、ゆらしなさい」2021',
        '「腰は、もまずにつまめば、腰痛は治る」2022',
        '「10秒筋膜ほぐし」2023',
        '「1日90秒、皿をほぐすだけで、ひざ痛は治る!」2024',
        '「マイナス10歳を手に入れる骨盤メンテ」2025'
      ],
      edited: [
        '「股関節拘縮の評価と運動療法 改訂版」2026/1',
        '「結果の出せる評価と治療 ─ 末梢神経とエコーから紐解く痛みの解釈 ─」2025',
        '「1日3分自触習慣！触診ドリル 上肢・頚部編」2024',
        '「肩関節の極意 痛み編」2024',
        '「臨床実習生・若手PTのための理学療法実践ナビ 脳血管疾患編」2023',
        '「スポーツ外傷・障害に対する術後のリハビリテーション 改訂第3版」2022',
        '「足関節拘縮の評価と運動療法」2022',
        '「脳卒中運動学」2021',
        '「入谷誠の理学療法」2020',
        '「マッスルインバランス改善の為の機能的運動療法ガイドブック」2020',
        '「五十肩の評価と運動療法」2019'
      ],
      papers: [
        '「体幹前方の/後方移行位における胸骨加圧後の歩行動作と筋機能について」',
        '「大腿周径の新たな測定方法とその信憑性について－健常者での予備研究－」'
      ]
    },
    soma: {
      name: '相馬 啓太',
      nameEn: 'Keita Soma',
      photo: './images/images20251021163631.png',
      meta: {
        '出身': '静岡県',
        '性格': 'とても明るく前向き',
        '趣味': '釣り',
        '信条': '社会に貢献する',
        '特技': '腕相撲',
        '好きな言葉': '七転び八起き'
      },
      qualifications: '理学療法士（国家資格）、小型船舶1級、サウナスパプロフェッショナル',
      career: [
        '社会医療法人 青虎会 フジ虎ノ門整形外科病院 入職',
        'コンディション・ラボ 入職',
        'GOTOクリニック 非常勤理学療法士'
      ],
      authored: [
        '「減らせ！贅肉習慣〜理学療法士が教えるリバウンドゼロダイエット〜」',
        '「100歳でも自分の足で歩けるひざの整え方」',
        '「臨床実習生および若手PTのための理学療法実践ナビ　運動器疾患編」'
      ],
      edited: [
        '「一流の臨床思考」',
        '「臨床に役立つPNF」',
        '「徒手療法ガイドブック　腰部・殿部・股関節・大腿 編」',
        '「徒手療法ガイドブックⅡ　膝関節・下腿・足関節・足部 編」',
        '「1日3分自触習慣！触診ドリル 下肢・体幹編」',
        '「園部式　歩行改善メソッド」',
        '「もう人任せにしない！腰痛の性格を見つけて治す！セルフマネジメント術！」'
      ]
    },
    wakabayashi: {
      name: '若林 和希',
      nameEn: 'Kazuki Wakabayashi',
      photo: './images/images20251021163855.jpg',
      meta: {
        '出身': '神奈川県',
        '性格': '好奇心旺盛でポジティブ思考',
        '趣味': 'サーフィン、サウナ',
        '信条': '謙虚に淡々と物事を遂行する',
        '特技': '野球、水泳',
        '好きな言葉': '人間万事塞翁が馬'
      },
      qualifications: '理学療法士（国家資格）、医科学修士',
      career: [
        '北里大学大学院 医療系研究科 修士課程 卒業',
        'コンディション・ラボ 入職',
        'GOTOクリニック 非常勤理学療法士',
        '過去の非常勤歴: 株式会社Re ambitious R-studio PLUS、ケアーズ訪問看護リハビリテーション相模原南'
      ],
      edited: [
        '「1日3分自触習慣！触診ドリル 下肢・体幹編」',
        '「下肢スポーツリハビリテーション ー関東労災病院モデルー」',
        '「園部俊晴の臨床『徒手療法ガイドブック』腰部・殿部・股関節・大腿編」'
      ]
    },
    mogi: {
      name: '茂木 悠太',
      nameEn: 'Yuta Mogi',
      photo: './images/images20251112142217.jpg',
      meta: {
        '出身': '群馬県高崎市',
        '性格': '優しい、人情深い',
        '趣味': '登山、スポーツ観戦、ライブ参加',
        '信条': '目の前の人の幸せに貢献すること',
        '特技': '人の良いところを見つけること、諦めないこと',
        '好きな言葉': '継続は力なり'
      },
      qualifications: '理学療法士（国家資格）、住環境コーディネーター2級',
      career: [
        '医療法人社団 明芳会 高島平中央総合病院 入職',
        'コンディション・ラボ 入職',
        '医療法人社団 明芳会 高島平中央総合病院 非常勤理学療法士'
      ],
      edited: [
        '「1日3分自触習慣！触診ドリル 下肢・体幹編」',
        '「園部俊晴の臨床『徒手療法ガイドブック』腰部・殿部・股関節・大腿編」',
        '「園部俊晴の臨床『徒手療法ガイドブック』膝関節・下腿・足関節・足部編」'
      ]
    }
  };

  const overlay = document.getElementById('staffModalOverlay');
  const modal = document.getElementById('staffModal');
  const closeBtn = document.getElementById('staffModalClose');

  function openStaffModal(key) {
    const d = staffData[key];
    if (!d) return;

    document.getElementById('staffModalPhoto').innerHTML =
      `<img src="${d.photo}" alt="${d.name}">`;
    document.getElementById('staffModalName').textContent = d.name;
    document.getElementById('staffModalNameEn').textContent = d.nameEn;

    // Meta
    let metaHtml = '';
    for (const [k, v] of Object.entries(d.meta)) {
      metaHtml += `<dt>${k}</dt><dd>${v}</dd>`;
    }
    document.getElementById('staffModalMeta').innerHTML = metaHtml;

    // Content
    let html = '';

    if (d.greeting) {
      html += `<p class="staff-modal__greeting">${d.greeting}</p>`;
    }

    if (d.bio) {
      html += `<h4 class="staff-modal__section-title">ABOUT</h4>`;
      html += `<p class="staff-modal__bio">${d.bio}</p>`;
    }

    if (d.qualifications) {
      html += `<h4 class="staff-modal__section-title">QUALIFICATIONS</h4>`;
      html += `<p class="staff-modal__qualifications">${d.qualifications}</p>`;
    }

    if (d.career && d.career.length) {
      html += `<h4 class="staff-modal__section-title">CAREER</h4>`;
      html += '<ul class="staff-modal__career">' +
        d.career.map(c => `<li>${c}</li>`).join('') + '</ul>';
    }

    if (d.books && d.books.length) {
      html += `<h4 class="staff-modal__section-title">PUBLICATIONS</h4>`;
      html += '<ul class="staff-modal__books">' +
        d.books.map(b => `<li>${b}</li>`).join('') + '</ul>';
    }

    if (d.authored && d.authored.length) {
      html += `<h4 class="staff-modal__section-title">著書</h4>`;
      html += '<ul class="staff-modal__books">' +
        d.authored.map(b => `<li>${b}</li>`).join('') + '</ul>';
      if (d.authoredMore) {
        html += `<p class="staff-modal__more-note">その他多数</p>`;
      }
    }

    if (d.edited && d.edited.length) {
      html += `<h4 class="staff-modal__section-title">編集・監修</h4>`;
      html += '<ul class="staff-modal__books">' +
        d.edited.map(b => `<li>${b}</li>`).join('') + '</ul>';
      if (d.editedMore) {
        html += `<p class="staff-modal__more-note">その他多数</p>`;
      }
    }

    if (d.papers) {
      if (Array.isArray(d.papers)) {
        html += `<h4 class="staff-modal__section-title">論文・レビュー</h4>`;
        html += `<details class="staff-modal__papers"><summary>全${d.papers.length}編を表示</summary>`;
        html += '<ol class="staff-modal__papers-list">' +
          d.papers.map(p => `<li>${p}</li>`).join('') + '</ol>';
        if (d.papersMore) {
          html += `<p class="staff-modal__more-note">その他多数</p>`;
        }
        html += '</details>';
      } else {
        html += `<h4 class="staff-modal__section-title">論文・レビュー</h4>`;
        html += `<p class="staff-modal__qualifications">${d.papers}</p>`;
      }
    }

    if (d.awards && d.awards.length) {
      html += `<h4 class="staff-modal__section-title">受賞</h4>`;
      html += '<ul class="staff-modal__books">' +
        d.awards.map(a => `<li>${a}</li>`).join('') + '</ul>';
    }

    if (d.media) {
      html += `<h4 class="staff-modal__section-title">メディア出演</h4>`;
      html += '<dl class="staff-modal__meta" style="display:block;">';
      for (const [k, v] of Object.entries(d.media)) {
        html += `<dt style="display:block;margin-top:8px;">${k}</dt><dd style="display:block;font-size:13px;line-height:1.8;color:var(--text-light);">${v}</dd>`;
      }
      html += '</dl>';
    }

    if (d.lectures) {
      html += `<h4 class="staff-modal__section-title">講演実績</h4>`;
      html += `<p class="staff-modal__qualifications">${d.lectures}</p>`;
    }

    document.getElementById('staffModalContent').innerHTML = html;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeStaffModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click handlers
  document.querySelectorAll('[data-staff]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // don't intercept links
      openStaffModal(el.dataset.staff);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeStaffModal);
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeStaffModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeStaffModal();
  });

  /* --- Menu Detail Modal --- */
  const menuData = {
    insole: {
      img: './images/images20251022131529.jpg',
      tag: 'RECOMMEND',
      title: 'インソール作成',
      prices: [
        { label: '初回料', value: '2,200', unit: '円（税込）' },
        { label: '作成費', value: '22,000', unit: '円（税込）' }
      ],
      desc: 'コンディション・ラボでは、来院して頂いたほとんどの患者様に、入谷式インソール（入谷式足底板）を作成致します。インソール（入谷式足底板）はその日のうちにできあがります（約1時間30分程度）。\n\nインソール（入谷式足底板）を作成する他の施設より安価ですが、作っていただければ、たくさんの著名人が訪れる理由を分かって頂けると思います。',
      includes: [
        '施術当日に完成（約1時間30分）',
        '動作分析による完全オーダーメイド',
        'コンディショニング費用込み',
        'お手持ちの靴をお持ちください'
      ],
      notes: [
        'インソール作成の場合は１時間の駐車場サービス券をお渡しいたしますのでご利用ください。',
        '初回料は、初回来院時にのみいただきます。'
      ]
    },
    conditioning: {
      img: './images/images20251022131233.png',
      tag: 'MAINTENANCE',
      title: 'コンディショニング',
      prices: [
        { label: '初回料', value: '2,200', unit: '円（税込）' },
        { label: '施術料', value: '4,180', unit: '円（税込）' }
      ],
      desc: 'インソール（入谷式足底板）の調整、運動指導、テーピング指導、ストレッチ、徒手的操作など行い、からだのメンテナンスを行います。\n\nコンディション・ラボでは、たくさん通わせて利益を得るようなことはしません。必要な頻度でからだのメンテナンスを行い、より良いからだの状態を維持できるようにすることを目的としています。\n\n症状がなくなり、状態が安定した患者様は、患者様のご要望に合わせながら、数ヶ月に1回〜年に1回程度のメンテナンスを行なっています。',
      includes: [
        'インソール（入谷式足底板）の調整',
        '運動指導・ストレッチ',
        'テーピング指導',
        '痛みの評価・ケアプログラム',
        '徒手的操作によるからだの調整'
      ],
      notes: [
        '初回料は、初回来院時にのみいただきます。',
        '施術のみの場合は駐車場サービス券はお渡ししておりませんので、ご了承くださいませ。'
      ]
    }
  };

  const menuOverlay = document.getElementById('menuModalOverlay');
  const menuCloseBtn = document.getElementById('menuModalClose');

  function openMenuModal(key) {
    const d = menuData[key];
    if (!d) return;

    document.getElementById('menuModalImg').src = d.img;
    document.getElementById('menuModalImg').alt = d.title;
    document.getElementById('menuModalTag').textContent = d.tag;
    document.getElementById('menuModalTitle').textContent = d.title;

    // Prices
    let priceHtml = '';
    d.prices.forEach((p, i) => {
      if (i > 0) priceHtml += '<div class="menu-modal__price-plus">+</div>';
      priceHtml += `<div class="menu-modal__price-item">
        <span class="menu-modal__price-label">${p.label}</span>
        <div class="menu-modal__price-value">${p.value}<span>${p.unit}</span></div>
      </div>`;
    });
    document.getElementById('menuModalPriceBlock').innerHTML = priceHtml;

    // Description
    const descHtml = d.desc.split('\n\n').map(p => `<p>${p}</p>`).join('');
    document.getElementById('menuModalDesc').innerHTML = descHtml;

    // Details (includes + notes)
    let detailsHtml = '<h4 class="menu-modal__section-title">INCLUDES</h4>';
    detailsHtml += '<ul class="menu-modal__includes">' +
      d.includes.map(item => `<li>${item}</li>`).join('') + '</ul>';

    if (d.notes && d.notes.length) {
      detailsHtml += '<div class="menu-modal__note">' +
        d.notes.map(n => `<p>※ ${n}</p>`).join('') + '</div>';
    }

    document.getElementById('menuModalDetails').innerHTML = detailsHtml;

    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenuModal() {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-menu]').forEach(btn => {
    btn.addEventListener('click', () => openMenuModal(btn.dataset.menu));
  });
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenuModal);
  if (menuOverlay) {
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) closeMenuModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) closeMenuModal();
  });

  /* --- Contact Form (mailto / Gmail) --- */
  const contactForm = document.getElementById('contactForm');
  const gmailBtn = document.getElementById('contactGmailBtn');

  function buildContactPayload() {
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const type = document.getElementById('cf-type').value;
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !type || !message) {
      contactForm.reportValidity();
      return null;
    }

    const subject = `【お問い合わせ】${type}`;
    const body = [
      `お名前: ${name}`,
      `メールアドレス: ${email}`,
      `種別: ${type}`,
      '',
      '【お問い合わせ内容】',
      message,
      '',
      '---',
      'コンディション・ラボ HPからのお問い合わせ'
    ].join('\n');

    return { subject, body };
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const p = buildContactPayload();
      if (!p) return;
      const mailto = `mailto:conditionlabo@gmail.com?subject=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(p.body)}`;
      // mailto: must use same-window navigation to trigger OS protocol handler
      window.location.href = mailto;
    });
  }

  if (gmailBtn) {
    gmailBtn.addEventListener('click', () => {
      const p = buildContactPayload();
      if (!p) return;
      const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=conditionlabo@gmail.com&su=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(p.body)}`;
      // Gmail web URL opens in new tab
      window.open(gmail, '_blank', 'noopener');
    });
  }

  /* --- Contact Modal --- */
  const contactOverlay = document.getElementById('contactModalOverlay');
  const openContactBtn = document.getElementById('openContactModal');
  const closeContactBtn = document.getElementById('contactModalClose');

  function openContactModal(e) {
    if (e) e.preventDefault();
    contactOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeContactModal() {
    contactOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (openContactBtn) openContactBtn.addEventListener('click', openContactModal);
  if (closeContactBtn) closeContactBtn.addEventListener('click', closeContactModal);
  if (contactOverlay) {
    contactOverlay.addEventListener('click', (e) => {
      if (e.target === contactOverlay) closeContactModal();
    });
  }

  /* --- Company Modal --- */
  const companyOverlay = document.getElementById('companyModalOverlay');
  const openCompanyBtn = document.getElementById('openCompanyModal');
  const closeCompanyBtn = document.getElementById('companyModalClose');

  function openCompanyModal(e) {
    if (e) e.preventDefault();
    companyOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeCompanyModal() {
    companyOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (openCompanyBtn) openCompanyBtn.addEventListener('click', openCompanyModal);
  if (closeCompanyBtn) closeCompanyBtn.addEventListener('click', closeCompanyModal);
  if (companyOverlay) {
    companyOverlay.addEventListener('click', (e) => {
      if (e.target === companyOverlay) closeCompanyModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (contactOverlay && contactOverlay.classList.contains('active')) closeContactModal();
      if (companyOverlay && companyOverlay.classList.contains('active')) closeCompanyModal();
    }
  });

  /* --- Voice Modal --- */
  const voiceOverlay = document.getElementById('voiceModalOverlay');
  const openVoiceBtn = document.getElementById('openVoiceModal');
  const closeVoiceBtn = document.getElementById('voiceModalClose');

  function openVoiceModal() {
    voiceOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeVoiceModal() {
    voiceOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openVoiceBtn) openVoiceBtn.addEventListener('click', openVoiceModal);
  if (closeVoiceBtn) closeVoiceBtn.addEventListener('click', closeVoiceModal);
  if (voiceOverlay) {
    voiceOverlay.addEventListener('click', (e) => {
      if (e.target === voiceOverlay) closeVoiceModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && voiceOverlay && voiceOverlay.classList.contains('active')) closeVoiceModal();
  });

  /* --- Books All Modal --- */
  const booksOverlay = document.getElementById('booksModalOverlay');
  const openBooksBtn = document.getElementById('openBooksModal');
  const closeBooksBtn = document.getElementById('booksModalClose');

  function openBooksModal() {
    booksOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeBooksModal() {
    booksOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBooksBtn) openBooksBtn.addEventListener('click', openBooksModal);
  if (closeBooksBtn) closeBooksBtn.addEventListener('click', closeBooksModal);
  if (booksOverlay) {
    booksOverlay.addEventListener('click', (e) => {
      if (e.target === booksOverlay) closeBooksModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && booksOverlay && booksOverlay.classList.contains('active')) closeBooksModal();
  });

  /* --- Walkguide Modal --- */
  const walkguideOverlay = document.getElementById('walkguideOverlay');
  const openWalkguideBtn = document.getElementById('openWalkguide');
  const closeWalkguideBtn = document.getElementById('walkguideClose');

  function openWalkguide() {
    walkguideOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeWalkguide() {
    walkguideOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openWalkguideBtn) openWalkguideBtn.addEventListener('click', openWalkguide);
  if (closeWalkguideBtn) closeWalkguideBtn.addEventListener('click', closeWalkguide);
  if (walkguideOverlay) {
    walkguideOverlay.addEventListener('click', (e) => {
      if (e.target === walkguideOverlay) closeWalkguide();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && walkguideOverlay && walkguideOverlay.classList.contains('active')) closeWalkguide();
  });

  /* --- Fixed CTA: show after scrolling past hero --- */
  const fixedCta = document.getElementById('fixedCta');
  if (fixedCta) {
    window.addEventListener('scroll', () => {
      fixedCta.style.transform = window.scrollY > window.innerHeight
        ? 'translateY(0)' : 'translateY(100%)';
    }, { passive: true });
    fixedCta.style.transition = 'transform 0.3s ease';
    fixedCta.style.transform = 'translateY(100%)';
  }

});
