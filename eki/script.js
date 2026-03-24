// 64卦のデータベース
const hexagrams = [
    {
        number: 1,
        name: "乾為天",
        reading: "けんいてん",
        structure: "上卦：天（☰）/ 下卦：天（☰）",
        symbol: "天が重なる形。純粋な陽のエネルギー。創造力と活力の極致。",
        meaning: "創造、剛健、自強不息。強い意志と行動力で物事を成し遂げる時期。リーダーシップを発揮し、積極的に前進すべき時。",
        advice: "自信を持って行動しましょう。ただし、傲慢にならず謙虚さを忘れないこと。時の流れを読み、適切なタイミングで動くことが重要です。"
    },
    {
        number: 2,
        name: "坤為地",
        reading: "こんいち",
        structure: "上卦：地（☷）/ 下卦：地（☷）",
        symbol: "大地が重なる形。純粋な陰のエネルギー。受容と養育の象徴。",
        meaning: "受容、柔順、包容力。受け入れる姿勢と忍耐が求められる時期。無理に主導せず、流れに従うことで道が開ける。",
        advice: "焦らず、受け入れる姿勢を大切にしましょう。地のように広く深く、他者を支える力を発揮する時です。柔軟性が成功の鍵となります。"
    },
    {
        number: 3,
        name: "水雷屯",
        reading: "すいらいちゅん",
        structure: "上卦：水（☵）/ 下卦：雷（☳）",
        symbol: "水の下に雷がある形。新しい生命が芽吹こうとする困難な時期。",
        meaning: "初めの困難、混沌、成長の兆し。物事を始める際の苦労を示すが、粘り強く取り組めば必ず道は開ける。",
        advice: "困難に直面しても諦めないこと。今は種を蒔く時期です。焦らず着実に準備を進め、良き協力者を得ることが大切です。"
    },
    {
        number: 4,
        name: "山水蒙",
        reading: "さんすいもう",
        structure: "上卦：山（☶）/ 下卦：水（☵）",
        symbol: "山の下に水が流れる形。未熟で迷いがある状態。",
        meaning: "啓蒙、教育、学び。知識や経験が不足している段階。謙虚に学ぶ姿勢が必要な時期。",
        advice: "無知を恥じることなく、素直に学びましょう。良い師を見つけ、教えを請うことが成長への近道です。自分の限界を認識することが第一歩です。"
    },
    {
        number: 5,
        name: "水天需",
        reading: "すいてんじゅ",
        structure: "上卦：水（☵）/ 下卦：天（☰）",
        symbol: "天の上に水雲がある形。雨を待つように、時期を待つべき状態。",
        meaning: "待つこと、養う、準備。急いで行動するのではなく、適切な時期を待つべき時。",
        advice: "焦りは禁物です。今は力を蓄え、機が熟すのを待ちましょう。準備を怠らず、心身を整えることで、チャンスが来た時に最高のパフォーマンスを発揮できます。"
    },
    {
        number: 6,
        name: "天水訟",
        reading: "てんすいしょう",
        structure: "上卦：天（☰）/ 下卦：水（☵）",
        symbol: "天と水が相反する形。意見の対立や争いを示す。",
        meaning: "争い、訴訟、対立。意見の不一致や衝突が起こりやすい時期。",
        advice: "争いは避けるべきです。どうしても避けられない場合は、公正な第三者の助けを求めましょう。意地を張らず、和解の道を探ることが賢明です。"
    },
    {
        number: 7,
        name: "地水師",
        reading: "ちすいし",
        structure: "上卦：地（☷）/ 下卦：水（☵）",
        symbol: "地中に水がある形。軍隊のように規律と統率が必要な状態。",
        meaning: "統率、組織、規律。多くの人々をまとめ、導く必要がある時期。",
        advice: "リーダーシップと責任感が求められます。公正で誠実な態度で人々を導きましょう。規律を保ちつつも、人々の心を理解することが重要です。"
    },
    {
        number: 8,
        name: "水地比",
        reading: "すいちひ",
        structure: "上卦：水（☵）/ 下卦：地（☷）",
        symbol: "地の上に水がある形。水が地に親しむように、親和を示す。",
        meaning: "親しみ、団結、協力。人々が助け合い、共に進む時期。",
        advice: "他者との絆を大切にしましょう。誠実な態度で接することで、強い信頼関係を築けます。ただし、依存しすぎず、自立心も保つことが大切です。"
    },
    {
        number: 9,
        name: "風天小畜",
        reading: "ふうてんしょうちく",
        structure: "上卦：風（☴）/ 下卦：天（☰）",
        symbol: "天の上に風がある形。小さく蓄える時期。",
        meaning: "小さな蓄積、準備、抑制。大きな成果はまだ先だが、着実に積み重ねる時期。",
        advice: "今は大きな行動を起こす時ではありません。小さなことを丁寧に積み重ね、力を蓄えましょう。謙虚な姿勢を保つことが重要です。"
    },
    {
        number: 10,
        name: "天沢履",
        reading: "てんたくり",
        structure: "上卦：天（☰）/ 下卦：沢（☱）",
        symbol: "沢の上に天がある形。虎の尾を踏むような危険な状況。",
        meaning: "礼節、慎重、危険。細心の注意を払って行動すべき時期。",
        advice: "慎重に行動しましょう。礼儀と節度を守り、軽率な行動は避けること。危険を冒す必要がある場合も、十分な準備と覚悟を持って臨みましょう。"
    },
    {
        number: 11,
        name: "地天泰",
        reading: "ちてんたい",
        structure: "上卦：地（☷）/ 下卦：天（☰）",
        symbol: "天地が交わる形。陰陽が調和し、万物が栄える。",
        meaning: "平和、繁栄、調和。物事が順調に進む最良の時期。",
        advice: "今は絶好調です。しかし、傲慢にならず謙虚さを保ちましょう。この良い状態を維持するため、感謝の心を忘れず、周囲との調和を大切にしてください。"
    },
    {
        number: 12,
        name: "天地否",
        reading: "てんちひ",
        structure: "上卦：天（☰）/ 下卦：地（☷）",
        symbol: "天地が離れる形。陰陽が交わらず、停滞する。",
        meaning: "閉塞、停滞、不調。物事が思うように進まない困難な時期。",
        advice: "今は忍耐の時です。無理に前進しようとせず、内面を磨き、来るべき好機に備えましょう。この困難も永遠には続きません。信念を持ち続けることが大切です。"
    },
    {
        number: 13,
        name: "天火同人",
        reading: "てんかどうじん",
        structure: "上卦：天（☰）/ 下卦：火（☲）",
        symbol: "火が天に昇る形。人々が同じ目的で集まる。",
        meaning: "協力、同志、公共性。志を同じくする人々との協力が実を結ぶ時期。",
        advice: "仲間との絆を大切にしましょう。公明正大な態度で、共通の目標に向かって協力することで大きな成果が得られます。私利私欲を捨てることが成功の鍵です。"
    },
    {
        number: 14,
        name: "火天大有",
        reading: "かてんたいゆう",
        structure: "上卦：火（☲）/ 下卦：天（☰）",
        symbol: "天の上に火が輝く形。大いなる所有と繁栄。",
        meaning: "大成功、豊かさ、繁栄。努力が実り、大きな成果を得る時期。",
        advice: "成功を手にしても謙虚さを忘れないでください。得たものを独占せず、周囲と分かち合うことで、さらなる発展が期待できます。感謝の心を持ち続けましょう。"
    },
    {
        number: 15,
        name: "地山謙",
        reading: "ちざんけん",
        structure: "上卦：地（☷）/ 下卦：山（☶）",
        symbol: "地の下に山がある形。謙遜の美徳。",
        meaning: "謙虚、控え目、美徳。へりくだる姿勢が幸運を招く時期。",
        advice: "謙虚な態度を保ちましょう。実力があっても驕らず、他者を立てることで、信頼と尊敬を得られます。控え目な姿勢が最大の武器となります。"
    },
    {
        number: 16,
        name: "雷地豫",
        reading: "らいちよ",
        structure: "上卦：雷（☳）/ 下卦：地（☷）",
        symbol: "地の上に雷が鳴る形。喜びと楽しみ。",
        meaning: "喜び、快楽、準備。心を緩め、楽しむことも大切な時期。",
        advice: "適度な休息と楽しみは必要です。ただし、怠惰にならず、将来への準備も怠らないこと。バランスを保ちながら、人生を楽しみましょう。"
    },
    {
        number: 17,
        name: "沢雷随",
        reading: "たくらいずい",
        structure: "上卦：沢（☱）/ 下卦：雷（☳）",
        symbol: "雷が沢に従う形。時流に従う。",
        meaning: "従う、適応、柔軟性。時代の流れや状況に従うべき時期。",
        advice: "固執せず、柔軟に対応しましょう。変化を受け入れ、時流に乗ることで新しいチャンスが開けます。ただし、自分の信念は失わないように。"
    },
    {
        number: 18,
        name: "山風蠱",
        reading: "さんぷうこ",
        structure: "上卦：山（☶）/ 下卦：風（☴）",
        symbol: "山の下に風がある形。腐敗と改革。",
        meaning: "腐敗、改革、再生。古いものを正し、新しくする時期。",
        advice: "問題を直視し、根本から改めましょう。古い習慣や誤りを正すことで、新しい発展の基礎が築けます。勇気を持って変革に取り組んでください。"
    },
    {
        number: 19,
        name: "地沢臨",
        reading: "ちたくりん",
        structure: "上卦：地（☷）/ 下卦：沢（☱）",
        symbol: "沢の上に地がある形。上から臨み見る。",
        meaning: "接近、監督、指導。物事に積極的に関わる時期。",
        advice: "リーダーシップを発揮しましょう。ただし、威圧的にならず、慈愛の心を持って人々を導くこと。細部にも目を配り、丁寧に対応することが大切です。"
    },
    {
        number: 20,
        name: "風地観",
        reading: "ふうちかん",
        structure: "上卦：風（☴）/ 下卦：地（☷）",
        symbol: "地の上に風が吹く形。観察と洞察。",
        meaning: "観察、瞑想、内省。じっくり観察し、本質を見極める時期。",
        advice: "焦って行動せず、まず観察しましょう。状況を冷静に分析し、本質を理解することで、正しい判断ができます。内面を見つめることも重要です。"
    },
    {
        number: 21,
        name: "火雷噬嗑",
        reading: "からいぜいごう",
        structure: "上卦：火（☲）/ 下卦：雷（☳）",
        symbol: "雷と火が合わさる形。障害を噛み砕く。",
        meaning: "障害の除去、裁き、決断。妨げを取り除く必要がある時期。",
        advice: "障害を恐れず立ち向かいましょう。公正な判断と断固とした行動で問題を解決すること。ただし、感情に流されず、冷静さを保つことが重要です。"
    },
    {
        number: 22,
        name: "山火賁",
        reading: "さんかひ",
        structure: "上卦：山（☶）/ 下卦：火（☲）",
        symbol: "火が山を飾る形。美しく飾ること。",
        meaning: "装飾、美化、文化。外見を整え、美を追求する時期。",
        advice: "見た目も大切にしましょう。ただし、外見だけでなく内面も磨くこと。形式と実質のバランスを保つことで、真の美が生まれます。"
    },
    {
        number: 23,
        name: "山地剥",
        reading: "さんちはく",
        structure: "上卦：山（☶）/ 下卦：地（☷）",
        symbol: "地の上の山が崩れる形。剥落と衰退。",
        meaning: "衰退、消滅、忍耐。物事が剥げ落ちていく厳しい時期。",
        advice: "今は守りに徹しましょう。無理な拡大は避け、現状維持に努めること。この困難な時期も必ず過ぎ去ります。耐え忍ぶことで、やがて新しい芽が出ます。"
    },
    {
        number: 24,
        name: "地雷復",
        reading: "ちらいふく",
        structure: "上卦：地（☷）/ 下卦：雷（☳）",
        symbol: "地中に雷が動く形。復活と再生。",
        meaning: "復活、回復、再生。衰えたものが再び力を取り戻す時期。",
        advice: "希望を持ちましょう。困難の後に必ず回復の時が来ます。今は無理せず、少しずつ力を取り戻すこと。小さな一歩から再スタートしましょう。"
    },
    {
        number: 25,
        name: "天雷無妄",
        reading: "てんらいむぼう",
        structure: "上卦：天（☰）/ 下卦：雷（☳）",
        symbol: "天の下に雷が動く形。天命に従う。",
        meaning: "無心、誠実、自然。偽りなく、自然の流れに従う時期。",
        advice: "無理な計算や打算を捨てましょう。誠実に、自然体で行動することで、天の助けを得られます。欲張らず、今あるものに感謝することが大切です。"
    },
    {
        number: 26,
        name: "山天大畜",
        reading: "さんてんたいちく",
        structure: "上卦：山（☶）/ 下卦：天（☰）",
        symbol: "天を山が止める形。大いに蓄える。",
        meaning: "大きな蓄積、抑制、準備。力を蓄え、時を待つ時期。",
        advice: "今は行動よりも蓄積の時です。知識、経験、資源を積み重ね、力を養いましょう。焦らず、十分な準備ができてから行動することが成功の鍵です。"
    },
    {
        number: 27,
        name: "山雷頤",
        reading: "さんらいい",
        structure: "上卦：山（☶）/ 下卦：雷（☳）",
        symbol: "口の形。養い、養われる。",
        meaning: "養う、育てる、節制。心身を養い、慎重に言葉を選ぶ時期。",
        advice: "心身の健康に注意しましょう。食事や生活習慣を見直し、自分を大切にすること。また、言葉にも気をつけ、他者を養う心を持つことが重要です。"
    },
    {
        number: 28,
        name: "沢風大過",
        reading: "たくふうたいか",
        structure: "上卦：沢（☱）/ 下卦：風（☴）",
        symbol: "大きな木が折れそうな形。過度な状態。",
        meaning: "過剰、危機、転換点。限界を超えた状態で、変化が必要な時期。",
        advice: "現状は持続不可能です。勇気を持って大きな変化を受け入れましょう。危機は転機でもあります。思い切った決断が、新しい道を開きます。"
    },
    {
        number: 29,
        name: "坎為水",
        reading: "かんいすい",
        structure: "上卦：水（☵）/ 下卦：水（☵）",
        symbol: "水が重なる形。危険と困難。",
        meaning: "危険、困難、試練。重なる困難に直面する厳しい時期。",
        advice: "困難から逃げずに立ち向かいましょう。誠実さを保ち、一歩一歩確実に進むこと。仲間の支えを求め、共に乗り越える努力が必要です。"
    },
    {
        number: 30,
        name: "離為火",
        reading: "りいか",
        structure: "上卦：火（☲）/ 下卦：火（☲）",
        symbol: "火が重なる形。明るさと依存。",
        meaning: "明るさ、知恵、依存。物事が明らかになり、正しい道を照らす時期。",
        advice: "知恵と洞察力を活かしましょう。明るい心で周囲を照らすこと。ただし、何かに依存しすぎないよう、自立心も保つことが大切です。"
    },
    {
        number: 31,
        name: "沢山咸",
        reading: "たくざんかん",
        structure: "上卦：沢（☱）/ 下卦：山（☶）",
        symbol: "山の上に沢がある形。感応と交流。",
        meaning: "感応、交流、結婚。心が通じ合い、良い関係が築かれる時期。",
        advice: "素直な心で他者と接しましょう。誠実なコミュニケーションで、深い絆を築けます。特に恋愛や結婚に良い時期です。心を開くことが大切です。"
    },
    {
        number: 32,
        name: "雷風恒",
        reading: "らいふうこう",
        structure: "上卦：雷（☳）/ 下卦：風（☴）",
        symbol: "風と雷が続く形。永続性と一貫性。",
        meaning: "永続、一貫性、持続。長く続けることの大切さを示す時期。",
        advice: "一貫性を保ちましょう。すぐに結果を求めず、長期的な視点で物事に取り組むこと。変わらぬ努力が、やがて大きな成果を生みます。"
    },
    {
        number: 33,
        name: "天山遯",
        reading: "てんざんとん",
        structure: "上卦：天（☰）/ 下卦：山（☶）",
        symbol: "山の上に天がある形。退却と隠遁。",
        meaning: "退却、隠遁、回避。一時的に退くことが賢明な時期。",
        advice: "無理に前進しようとせず、戦略的に退きましょう。力を温存し、時機を待つこと。退却は敗北ではなく、次の勝利のための準備です。"
    },
    {
        number: 34,
        name: "雷天大壮",
        reading: "らいてんたいそう",
        structure: "上卦：雷（☳）/ 下卦：天（☰）",
        symbol: "天の上に雷が鳴る形。大いなる力。",
        meaning: "強大、盛大、勢い。力が充実し、前進すべき時期。",
        advice: "今は行動の時です。自信を持って前進しましょう。ただし、力に溺れず、正しい道を歩むこと。正義と礼節を忘れないことが重要です。"
    },
    {
        number: 35,
        name: "火地晋",
        reading: "かちしん",
        structure: "上卦：火（☲）/ 下卦：地（☷）",
        symbol: "地の上に火が昇る形。前進と昇進。",
        meaning: "前進、昇進、発展。順調に進展し、認められる時期。",
        advice: "積極的に前進しましょう。あなたの努力が認められ、昇進や発展の機会が訪れます。謙虚さを保ちつつ、自信を持って進んでください。"
    },
    {
        number: 36,
        name: "地火明夷",
        reading: "ちかめいい",
        structure: "上卦：地（☷）/ 下卦：火（☲）",
        symbol: "火が地に隠れる形。光が傷つく。",
        meaning: "困難、隠忍、忍耐。光が隠され、苦難に耐える時期。",
        advice: "今は耐え忍ぶ時です。自分の才能や光を隠し、低い姿勢で過ごすこと。この困難も永遠には続きません。内なる光を保ち続けましょう。"
    },
    {
        number: 37,
        name: "風火家人",
        reading: "ふうかかじん",
        structure: "上卦：風（☴）/ 下卦：火（☲）",
        symbol: "火の上に風がある形。家庭と調和。",
        meaning: "家庭、秩序、調和。家族や組織内の秩序が重要な時期。",
        advice: "家庭や身近な人々との関係を大切にしましょう。秩序と規律を保ちつつも、温かい心で接すること。足元を固めることが、外での成功につながります。"
    },
    {
        number: 38,
        name: "火沢睽",
        reading: "かたくけい",
        structure: "上卦：火（☲）/ 下卦：沢（☱）",
        symbol: "火と沢が背き合う形。対立と乖離。",
        meaning: "対立、背反、乖離。意見や方向性が異なる時期。",
        advice: "対立を恐れず、小さな協力から始めましょう。完全な一致を求めず、違いを認めつつ、共通点を見出すこと。柔軟な姿勢が大切です。"
    },
    {
        number: 39,
        name: "水山蹇",
        reading: "すいざんけん",
        structure: "上卦：水（☵）/ 下卦：山（☶）",
        symbol: "山の前に水がある形。困難と障害。",
        meaning: "困難、障害、停滞。前進が阻まれる厳しい時期。",
        advice: "無理に前進せず、今は準備の時と考えましょう。困難を直視し、内省することで、真の強さを得られます。仲間との協力も重要です。"
    },
    {
        number: 40,
        name: "雷水解",
        reading: "らいすいかい",
        structure: "上卦：雷（☳）/ 下卦：水（☵）",
        symbol: "水の上に雷が動く形。解放と解決。",
        meaning: "解放、解決、解消。困難が解け、自由になる時期。",
        advice: "束縛から解放される時です。ただし、急激な変化に注意し、冷静に対処すること。過去の執着を手放し、新しいスタートを切りましょう。"
    },
    {
        number: 41,
        name: "山沢損",
        reading: "さんたくそん",
        structure: "上卦：山（☶）/ 下卦：沢（☱）",
        symbol: "沢が山を削る形。減らすこと。",
        meaning: "減損、節約、謙虚。余分を削ぎ落とし、本質に迫る時期。",
        advice: "不要なものを手放しましょう。物質的な豊かさよりも、精神的な充実を求めること。謙虚さと節制が、やがて大きな利益をもたらします。"
    },
    {
        number: 42,
        name: "風雷益",
        reading: "ふうらいえき",
        structure: "上卦：風（☴）/ 下卦：雷（☳）",
        symbol: "雷の上に風がある形。増益と成長。",
        meaning: "増益、成長、発展。利益が増え、発展する良い時期。",
        advice: "成長のチャンスです。他者を助けることで、自分も益を得られます。ただし、得た利益を独占せず、社会に還元することが、さらなる発展につながります。"
    },
    {
        number: 43,
        name: "沢天夬",
        reading: "たくてんかい",
        structure: "上卦：沢（☱）/ 下卦：天（☰）",
        symbol: "天の上に沢がある形。決断と断行。",
        meaning: "決断、断行、決着。悪を断ち、決断すべき時期。",
        advice: "決断の時です。優柔不断は禁物。ただし、強引になりすぎず、公正な態度を保つこと。正義と誠実さを持って、断固として行動しましょう。"
    },
    {
        number: 44,
        name: "天風姤",
        reading: "てんぷうこう",
        structure: "上卦：天（☰）/ 下卦：風（☴）",
        symbol: "風が天下に吹く形。予期せぬ出会い。",
        meaning: "遭遇、出会い、誘惑。予期しない出会いや出来事がある時期。",
        advice: "予期せぬ出会いに注意しましょう。魅力的に見えても、慎重に判断すること。すべてを受け入れず、本質を見極める目を持つことが重要です。"
    },
    {
        number: 45,
        name: "沢地萃",
        reading: "たくちすい",
        structure: "上卦：沢（☱）/ 下卦：地（☷）",
        symbol: "地の上に沢がある形。集まり、集合。",
        meaning: "集合、団結、統合。人々が集まり、力を合わせる時期。",
        advice: "人々と協力しましょう。共通の目的のために団結することで、大きな力が生まれます。リーダーシップを発揮し、みんなをまとめることが重要です。"
    },
    {
        number: 46,
        name: "地風升",
        reading: "ちふうしょう",
        structure: "上卦：地（☷）/ 下卦：風（☴）",
        symbol: "地中に木が成長する形。上昇と成長。",
        meaning: "上昇、成長、発展。着実に上昇し、成長する時期。",
        advice: "順調に成長しています。焦らず、一歩一歩確実に進みましょう。謙虚さを保ちつつ、自信を持って前進すること。継続的な努力が実を結びます。"
    },
    {
        number: 47,
        name: "沢水困",
        reading: "たくすいこん",
        structure: "上卦：沢（☱）/ 下卦：水（☵）",
        symbol: "沢の水が枯れる形。困窮と困難。",
        meaning: "困窮、疲労、苦境。資源が枯渇し、苦しい時期。",
        advice: "困難に直面しても諦めないでください。今は試練の時ですが、信念を持ち続けることが大切です。無駄を省き、本質的なものに集中しましょう。"
    },
    {
        number: 48,
        name: "水風井",
        reading: "すいふうせい",
        structure: "上卦：水（☵）/ 下卦：風（☴）",
        symbol: "井戸の形。普遍的な資源。",
        meaning: "井戸、資源、貢献。変わらぬ価値を提供し続ける時期。",
        advice: "他者に貢献しましょう。井戸のように、誰にでも価値を提供する姿勢が大切です。自分を磨き続け、常に新鮮で清らかな価値を提供することを心がけてください。"
    },
    {
        number: 49,
        name: "沢火革",
        reading: "たくかかく",
        structure: "上卦：沢（☱）/ 下卦：火（☲）",
        symbol: "火と水が消し合う形。革命と変革。",
        meaning: "革命、変革、改革。古いものを新しくする時期。",
        advice: "変革の時です。古い体制や習慣を改め、新しいものを取り入れましょう。ただし、変えるべきものと守るべきものを見極めることが重要です。"
    },
    {
        number: 50,
        name: "火風鼎",
        reading: "かふうてい",
        structure: "上卦：火（☲）/ 下卦：風（☴）",
        symbol: "鼎（かなえ）の形。変革の完成。",
        meaning: "安定、成就、新秩序。変革が成功し、新しい秩序が確立する時期。",
        advice: "新しい秩序を確立しましょう。有能な人材を適切に配置し、システムを整えること。伝統を尊重しつつ、時代に合った新しい形を作り上げてください。"
    },
    {
        number: 51,
        name: "震為雷",
        reading: "しんいらい",
        structure: "上卦：雷（☳）/ 下卦：雷（☳）",
        symbol: "雷が重なる形。激しい動きと驚き。",
        meaning: "震動、驚愕、覚醒。突然の出来事に驚く時期。",
        advice: "驚きや恐れに負けないでください。突然の変化も、成長の機会と捉えましょう。冷静さを保ち、恐れつつも慎重に進むことで、困難を乗り越えられます。"
    },
    {
        number: 52,
        name: "艮為山",
        reading: "ごんいざん",
        structure: "上卦：山（☶）/ 下卦：山（☶）",
        symbol: "山が重なる形。止まることの重要性。",
        meaning: "停止、瞑想、不動。動かず、じっとしているべき時期。",
        advice: "今は動かない方が賢明です。内省と瞑想の時間を持ち、自分自身を見つめ直しましょう。焦らず、適切な時期まで待つことが成功への道です。"
    },
    {
        number: 53,
        name: "風山漸",
        reading: "ふうざんぜん",
        structure: "上卦：風（☴）/ 下卦：山（☶）",
        symbol: "山に木が徐々に成長する形。漸進的な進歩。",
        meaning: "漸進、着実、順序。ゆっくりと着実に進む時期。",
        advice: "焦らず、着実に進みましょう。順序を守り、段階を踏むことで、確実な成功が得られます。急いで結果を求めず、プロセスを大切にしてください。"
    },
    {
        number: 54,
        name: "雷沢归妹",
        reading: "らいたくきまい",
        structure: "上卦：雷（☳）/ 下卦：沢（☱）",
        symbol: "若い女性が嫁ぐ形。軽率な行動への警告。",
        meaning: "帰妹、軽率、注意。感情的な行動に注意が必要な時期。",
        advice: "感情に流されないよう注意しましょう。魅力的に見えても、慎重に判断すること。軽率な決断は避け、長期的な視点で物事を考えてください。"
    },
    {
        number: 55,
        name: "雷火豊",
        reading: "らいかほう",
        structure: "上卦：雷（☳）/ 下卦：火（☲）",
        symbol: "雷と火が盛んな形。豊かさの絶頂。",
        meaning: "豊穣、繁栄、絶頂。最も豊かで盛んな時期。",
        advice: "今は絶頂期です。しかし、満ちれば欠けるのが道理。謙虚さを保ち、将来に備えましょう。繁栄を維持するために、常に努力を怠らないことが大切です。"
    },
    {
        number: 56,
        name: "火山旅",
        reading: "かざんりょ",
        structure: "上卦：火（☲）/ 下卦：山（☶）",
        symbol: "山の上に火がある形。旅と一時性。",
        meaning: "旅、移動、一時性。定まらず、移動する時期。",
        advice: "今は定住の時ではありません。柔軟に対応し、謙虚な姿勢を保ちましょう。旅人のように慎重に行動し、不必要な争いは避けてください。"
    },
    {
        number: 57,
        name: "巽為風",
        reading: "そんいふう",
        structure: "上卦：風（☴）/ 下卦：風（☴）",
        symbol: "風が重なる形。柔軟性と浸透。",
        meaning: "柔順、浸透、継続。柔軟性を持って徐々に浸透する時期。",
        advice: "柔軟な姿勢で臨みましょう。風のように、柔らかく継続的に働きかけることで、やがて大きな変化をもたらせます。謙虚で従順な態度が成功の鍵です。"
    },
    {
        number: 58,
        name: "兌為沢",
        reading: "だいたく",
        structure: "上卦：沢（☱）/ 下卦：沢（☱）",
        symbol: "沢が重なる形。喜びと楽しみ。",
        meaning: "喜び、交流、楽しみ。心を開き、喜びを分かち合う時期。",
        advice: "喜びを大切にしましょう。他者との交流を楽しみ、明るい心で過ごすこと。ただし、度を超えないよう、節度を保つことも忘れずに。"
    },
    {
        number: 59,
        name: "風水渙",
        reading: "ふうすいかん",
        structure: "上卦：風（☴）/ 下卦：水（☵）",
        symbol: "水の上に風が吹く形。散らす、解散。",
        meaning: "散逸、解散、解消。固まったものが散り、解ける時期。",
        advice: "固執を手放しましょう。執着や偏見を手放すことで、新しい可能性が開けます。心を開き、柔軟に対応することが大切です。"
    },
    {
        number: 60,
        name: "水沢節",
        reading: "すいたくせつ",
        structure: "上卦：水（☵）/ 下卦：沢（☱）",
        symbol: "沢に水がある形。節度と制限。",
        meaning: "節制、制限、規律。適度な制限が必要な時期。",
        advice: "節度を保ちましょう。過度は禁物ですが、適切な制限は成長を促します。自己規律を持ち、バランスを保つことで、持続可能な発展が得られます。"
    },
    {
        number: 61,
        name: "風沢中孚",
        reading: "ふうたくちゅうふ",
        structure: "上卦：風（☴）/ 下卦：沢（☱）",
        symbol: "風と沢が調和する形。内なる誠実さ。",
        meaning: "誠実、信頼、真心。内なる誠実さが通じる時期。",
        advice: "誠実であり続けましょう。真心を持って接することで、他者の信頼を得られます。表面的な行動ではなく、内面からの誠実さが大切です。"
    },
    {
        number: 62,
        name: "雷山小過",
        reading: "らいざんしょうか",
        structure: "上卦：雷（☳）/ 下卦：山（☶）",
        symbol: "山の上に雷がある形。小さく過ぎる。",
        meaning: "小過、慎重、謙虚。大きなことは避け、小さく控えめに行う時期。",
        advice: "謙虚に、小さく行動しましょう。大きな野心は避け、身の丈に合った行動をすること。慎重さと細やかな配慮が、良い結果をもたらします。"
    },
    {
        number: 63,
        name: "水火既済",
        reading: "すいかきせい",
        structure: "上卦：水（☵）/ 下卦：火（☲）",
        symbol: "水と火が調和する形。完成と達成。",
        meaning: "完成、達成、成就。物事が完成し、バランスが取れた時期。",
        advice: "成功を喜びましょう。ただし、完成は新たな始まりでもあります。油断せず、謙虚さを保ち、次のステップに備えることが重要です。"
    },
    {
        number: 64,
        name: "火水未済",
        reading: "かすいびせい",
        structure: "上卦：火（☲）/ 下卦：水（☵）",
        symbol: "火と水が混乱する形。未完成と可能性。",
        meaning: "未完成、継続、可能性。まだ完成していないが、可能性に満ちた時期。",
        advice: "まだ終わりではありません。希望を持って継続しましょう。慎重に進み、最後まで気を抜かないこと。未完成だからこそ、無限の可能性があります。"
    }
];

// 変爻の解釈
const changingLineInterpretations = [
    "初爻が変化：基盤や始まりに変化が訪れます。基礎をしっかり固めましょう。",
    "二爻が変化：内面や人間関係に変化が訪れます。誠実な対応を心がけましょう。",
    "三爻が変化：転換期を迎えています。慎重な判断が求められます。",
    "四爻が変化：外部環境や周囲との関係に変化が訪れます。柔軟に対応しましょう。",
    "五爻が変化：中心的な役割や責任に変化が訪れます。リーダーシップを発揮しましょう。",
    "上爻が変化：頂点や結果に変化が訪れます。謙虚さを保ちつつ、次へ備えましょう。"
];

// DOM要素
const divineBtn = document.getElementById('divineBtn');
const loading = document.getElementById('loading');
const resultSection = document.getElementById('result');
const hexagramDisplay = document.getElementById('hexagramDisplay');
const hexagramName = document.getElementById('hexagramName');
const hexagramReading = document.getElementById('hexagramReading');
const hexagramStructure = document.getElementById('hexagramStructure');
const hexagramSymbol = document.getElementById('hexagramSymbol');
const hexagramMeaning = document.getElementById('hexagramMeaning');
const changingLinesSection = document.getElementById('changingLinesSection');
const changingLinesDiv = document.getElementById('changingLines');
const hexagramAdvice = document.getElementById('hexagramAdvice');
const timestamp = document.getElementById('timestamp');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// 占断の実行
divineBtn.addEventListener('click', performDivination);
clearHistoryBtn.addEventListener('click', clearHistory);

function performDivination() {
    // ボタンを無効化
    divineBtn.disabled = true;
    
    // ローディング表示
    loading.classList.remove('hidden');
    resultSection.classList.add('hidden');
    
    // アニメーション後に結果を表示
    setTimeout(() => {
        // ランダムに卦を選択
        const hexagram = hexagrams[Math.floor(Math.random() * hexagrams.length)];
        
        // 変爻をランダムに生成（0-3本程度）
        const changingLines = generateChangingLines();
        
        // 結果を表示
        displayResult(hexagram, changingLines);
        
        // 履歴に保存
        saveToHistory(hexagram, changingLines);
        
        // ローディングを隠して結果を表示
        loading.classList.add('hidden');
        resultSection.classList.remove('hidden');
        
        // ボタンを再度有効化
        divineBtn.disabled = false;
    }, 2000);
}

function generateChangingLines() {
    const lines = [];
    const numChangingLines = Math.floor(Math.random() * 4); // 0-3本の変爻
    
    for (let i = 0; i < numChangingLines; i++) {
        let line;
        do {
            line = Math.floor(Math.random() * 6);
        } while (lines.includes(line));
        lines.push(line);
    }
    
    return lines.sort((a, b) => a - b);
}

function displayResult(hexagram, changingLines) {
    // 卦の視覚的表示
    displayHexagram(hexagram.number, changingLines);
    
    // 卦の情報表示
    hexagramName.textContent = `${hexagram.number}. ${hexagram.name}`;
    hexagramReading.textContent = hexagram.reading;
    hexagramStructure.textContent = hexagram.structure;
    hexagramSymbol.textContent = hexagram.symbol;
    hexagramMeaning.textContent = hexagram.meaning;
    hexagramAdvice.textContent = hexagram.advice;
    
    // 変爻の表示
    if (changingLines.length > 0) {
        changingLinesSection.style.display = 'block';
        changingLinesDiv.innerHTML = changingLines.map(line => 
            `<div class="line-item">${changingLineInterpretations[line]}</div>`
        ).join('');
    } else {
        changingLinesSection.style.display = 'none';
    }
    
    // タイムスタンプ
    const now = new Date();
    timestamp.textContent = `占断日時: ${now.toLocaleString('ja-JP')}`;
}

function displayHexagram(number, changingLines) {
    // 卦の構成を取得（簡易版：実際は各卦の構成を定義する必要がある）
    const lines = getHexagramLines(number);
    
    hexagramDisplay.innerHTML = '';
    
    // 上から順に爻を表示（易は下から数えるが、表示は上から）
    for (let i = 5; i >= 0; i--) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'hexagram-line';
        
        const isYang = lines[i];
        const isChanging = changingLines.includes(i);
        
        if (isYang) {
            // 陽爻（実線）
            const line = document.createElement('div');
            line.className = `line yang ${isChanging ? 'changing' : ''}`;
            lineDiv.appendChild(line);
        } else {
            // 陰爻（破線）
            const line1 = document.createElement('div');
            line1.className = `line yin ${isChanging ? 'changing' : ''}`;
            const line2 = document.createElement('div');
            line2.className = `line yin ${isChanging ? 'changing' : ''}`;
            lineDiv.appendChild(line1);
            lineDiv.appendChild(line2);
        }
        
        hexagramDisplay.appendChild(lineDiv);
    }
}

function getHexagramLines(number) {
    // 六十四卦の爻の構成（1=陽、0=陰）
    // 下から上への順番で定義
    const hexagramStructures = [
        [1,1,1,1,1,1], // 1. 乾為天
        [0,0,0,0,0,0], // 2. 坤為地
        [0,1,0,0,0,1], // 3. 水雷屯
        [1,0,0,0,1,0], // 4. 山水蒙
        [1,1,1,0,1,0], // 5. 水天需
        [0,1,0,1,1,1], // 6. 天水訟
        [0,1,0,0,0,0], // 7. 地水師
        [0,0,0,0,1,0], // 8. 水地比
        [1,1,1,0,1,1], // 9. 風天小畜
        [1,1,0,1,1,1], // 10. 天沢履
        [1,1,1,0,0,0], // 11. 地天泰
        [0,0,0,1,1,1], // 12. 天地否
        [1,0,1,1,1,1], // 13. 天火同人
        [1,1,1,1,0,1], // 14. 火天大有
        [0,0,1,0,0,0], // 15. 地山謙
        [0,0,0,1,0,0], // 16. 雷地豫
        [1,0,0,0,1,1], // 17. 沢雷随
        [0,1,1,0,1,1], // 18. 山風蠱
        [1,1,0,0,0,0], // 19. 地沢臨
        [0,0,0,0,1,1], // 20. 風地観
        [1,0,1,0,0,1], // 21. 火雷噬嗑
        [1,0,0,1,0,1], // 22. 山火賁
        [1,0,0,0,0,0], // 23. 山地剥
        [0,0,0,0,0,1], // 24. 地雷復
        [1,0,0,1,1,1], // 25. 天雷無妄
        [1,1,1,0,0,1], // 26. 山天大畜
        [1,0,0,0,0,1], // 27. 山雷頤
        [0,1,1,1,1,0], // 28. 沢風大過
        [0,1,0,0,1,0], // 29. 坎為水
        [1,0,1,1,0,1], // 30. 離為火
        [0,0,1,1,1,0], // 31. 沢山咸
        [0,0,1,1,0,1], // 32. 雷風恒
        [0,0,1,1,1,1], // 33. 天山遯
        [1,1,1,1,0,0], // 34. 雷天大壮
        [0,0,0,1,0,1], // 35. 火地晋
        [1,0,1,0,0,0], // 36. 地火明夷
        [0,1,1,1,0,1], // 37. 風火家人
        [1,0,1,1,1,0], // 38. 火沢睽
        [0,0,1,0,1,0], // 39. 水山蹇
        [0,1,0,0,1,0], // 40. 雷水解
        [0,0,1,1,1,0], // 41. 山沢損
        [0,1,1,0,0,1], // 42. 風雷益
        [1,1,1,1,1,0], // 43. 沢天夬
        [0,1,1,1,1,1], // 44. 天風姤
        [0,0,0,1,1,0], // 45. 沢地萃
        [0,1,1,0,0,0], // 46. 地風升
        [0,1,0,1,1,0], // 47. 沢水困
        [0,1,1,0,1,0], // 48. 水風井
        [1,1,0,1,0,1], // 49. 沢火革
        [1,0,1,0,1,1], // 50. 火風鼎
        [0,0,1,0,0,1], // 51. 震為雷
        [1,0,0,1,0,0], // 52. 艮為山
        [0,0,1,0,1,1], // 53. 風山漸
        [1,1,0,1,0,0], // 54. 雷沢归妹
        [1,0,1,0,0,1], // 55. 雷火豊
        [1,0,0,1,0,1], // 56. 火山旅
        [0,1,1,0,1,1], // 57. 巽為風
        [1,1,0,1,1,0], // 58. 兌為沢
        [0,1,0,0,1,1], // 59. 風水渙
        [0,1,0,1,1,0], // 60. 水沢節
        [1,1,0,0,1,1], // 61. 風沢中孚
        [0,0,1,1,0,0], // 62. 雷山小過
        [0,1,0,1,0,1], // 63. 水火既済
        [1,0,1,0,1,0]  // 64. 火水未済
    ];
    
    return hexagramStructures[number - 1];
}

function saveToHistory(hexagram, changingLines) {
    const history = getHistory();
    const record = {
        hexagram: hexagram,
        changingLines: changingLines,
        timestamp: new Date().toISOString()
    };
    
    history.unshift(record);
    
    // 最大50件まで保存
    if (history.length > 50) {
        history.pop();
    }
    
    localStorage.setItem('divinationHistory', JSON.stringify(history));
    displayHistory();
}

function getHistory() {
    const historyJson = localStorage.getItem('divinationHistory');
    return historyJson ? JSON.parse(historyJson) : [];
}

function displayHistory() {
    const history = getHistory();
    
    if (history.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">履歴はまだありません</p>';
        return;
    }
    
    historyList.innerHTML = history.map((record, index) => {
        const date = new Date(record.timestamp);
        return `
            <div class="history-item" onclick="showHistoryDetail(${index})">
                <div class="history-item-name">${record.hexagram.name}</div>
                <div class="history-item-time">${date.toLocaleString('ja-JP')}</div>
            </div>
        `;
    }).join('');
}

function showHistoryDetail(index) {
    const history = getHistory();
    const record = history[index];
    displayResult(record.hexagram, record.changingLines);
    
    // 結果セクションまでスクロール
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function clearHistory() {
    if (confirm('占断履歴をすべて削除しますか？')) {
        localStorage.removeItem('divinationHistory');
        displayHistory();
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    displayHistory();
});
