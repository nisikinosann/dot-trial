const scenario = [
    // 1. 開廷
    {
        id: 'start',
        speaker: '裁判長',
        text: 'これより、被告人・権田原健二（ごんだわら けんじ）の殺人事件に関する審理を始めます。',
        character: 'judge',
        next: 'prosecutor_opening'
    },
    // 2. 検察官の冒頭陳述
    {
        id: 'prosecutor_opening',
        speaker: '検察官',
        text: '被告人は、昨夜10時、被害者である叔父の権田原金蔵（きんぞう）を、その書斎にて殺害しました。',
        character: 'prosecutor',
        next: 'prosecutor_opening_2'
    },
    {
        id: 'prosecutor_opening_2',
        speaker: '検察官',
        text: '動機は遺産相続。凶器は現場にあったブロンズ像です。そして、決定的な目撃者がいます。',
        character: 'prosecutor',
        next: 'defense_opening'
    },
    // 3. 弁護側の思考
    {
        id: 'defense_opening',
        speaker: '弁護士（あなた）',
        text: '（くっ...いきなり崖っぷちだ。だが、依頼人の無実を信じて戦うしかない！）',
        character: 'defense_attorney',
        next: 'judge_call_witness'
    },
    // 4. 証人入廷
    {
        id: 'judge_call_witness',
        speaker: '裁判長',
        text: 'では、検察側は証人を入廷させてください。',
        character: 'judge',
        next: 'witness_enter'
    },
    {
        id: 'witness_enter',
        speaker: '証人',
        text: 'し、失礼いたします...。屋敷でメイドをしております、サキと申します。',
        character: 'witness',
        next: 'witness_testimony_start'
    },
    // 5. 証言開始
    {
        id: 'witness_testimony_start',
        speaker: '検察官',
        text: 'サキさん、あなたが昨夜見たことを、ありのままに話してください。',
        character: 'prosecutor',
        next: 'witness_testimony_1'
    },
    {
        id: 'witness_testimony_1',
        speaker: '証人',
        text: 'はい...。昨夜、私は旦那様の書斎の掃除を頼まれていて、廊下を歩いていました。',
        character: 'witness',
        next: 'witness_testimony_2'
    },
    {
        id: 'witness_testimony_2',
        speaker: '証人',
        text: 'すると、書斎のドアが開いて、権田原健二様...被告人が慌てて出てくるのを見ました。',
        character: 'witness',
        next: 'witness_testimony_3'
    },
    {
        id: 'witness_testimony_3',
        speaker: '証人',
        text: 'その直後、中から「うわぁぁ！」という悲鳴が聞こえて...怖くなって警察に通報しました。',
        character: 'witness',
        next: 'cross_exam_start'
    },
    // 6. 尋問開始
    {
        id: 'cross_exam_start',
        speaker: '弁護士（あなた）',
        text: '（ふむ...完璧な証言に見えるが、どこかに穴があるはずだ。どこを突く？）',
        character: 'defense_attorney',
        choices: [
            { text: '犯行時刻について', next: 'cross_exam_time' },
            { text: '見間違いではないか？', next: 'cross_exam_mistake' }
        ]
    },
    // 分岐：見間違い？
    {
        id: 'cross_exam_mistake',
        speaker: '弁護士（あなた）',
        text: '廊下は暗かったはずです。本当に被告人でしたか？見間違いの可能性は？',
        character: 'defense_attorney',
        next: 'witness_rebuttal_mistake'
    },
    {
        id: 'witness_rebuttal_mistake',
        speaker: '証人',
        text: 'いいえ！廊下の電気はついていましたし、健二様の特徴的な赤いジャケットは間違いようがありません！',
        character: 'witness',
        next: 'cross_exam_mistake_failed'
    },
    {
        id: 'cross_exam_mistake_failed',
        speaker: '検察官',
        text: '残念でしたね。被告人がそのジャケットを着ていたことは警察も確認済みです。',
        character: 'prosecutor',
        next: 'cross_exam_start' // 戻る
    },
    // 分岐：時刻について（正解ルートへの入り口）
    {
        id: 'cross_exam_time',
        speaker: '弁護士（あなた）',
        text: 'あなたが被告人を見たのは、正確に何時頃でしたか？',
        character: 'defense_attorney',
        next: 'witness_time_detail'
    },
    {
        id: 'witness_time_detail',
        speaker: '証人',
        text: 'ええと...ちょうど夜の10時ぴったりでした。',
        character: 'witness',
        next: 'defense_press_time'
    },
    {
        id: 'defense_press_time',
        speaker: '弁護士（あなた）',
        text: 'なぜ「ぴったり」だと言い切れるのですか？時計を見ていたのですか？',
        character: 'defense_attorney',
        next: 'witness_clock_reveal'
    },
    {
        id: 'witness_clock_reveal',
        speaker: '証人',
        text: '時計は見ていませんが...書斎にある大きな古時計が、ちょうど「ボーン、ボーン」と10回鳴ったのを聞いたんです。',
        character: 'witness',
        next: 'defense_thinking_clock'
    },
    {
        id: 'defense_thinking_clock',
        speaker: '弁護士（あなた）',
        text: '（古時計の音で時間を知った...？待てよ、あの屋敷の古時計には秘密があったはずだ...！）',
        character: 'defense_attorney',
        choices: [
            { text: 'その証言に異議あり！', next: 'objection_clock' },
            { text: 'なるほど、わかりました', next: 'accept_testimony' }
        ]
    },
    // 分岐：受け入れる（失敗）
    {
        id: 'accept_testimony',
        speaker: '弁護士（あなた）',
        text: 'なるほど...それなら時間は正確ですね。',
        character: 'defense_attorney',
        next: 'bad_end'
    },
    {
        id: 'bad_end',
        speaker: '裁判長',
        text: '弁護人、反論はないようですな。では判決を言い渡します。被告人は有罪！',
        character: 'judge',
        next: 'start' // 最初に戻る
    },
    // 分岐：異議あり（正解）
    {
        id: 'objection_clock',
        speaker: '弁護士（あなた）',
        text: '異議あり！！その証言は、決定的な矛盾を含んでいます！',
        character: 'defense_attorney',
        cutIn: 'objection', // カットイン演出
        next: 'prosecutor_shock'
    },
    {
        id: 'prosecutor_shock',
        speaker: '検察官',
        text: 'な、なんだと！？何が矛盾していると言うんだ！',
        character: 'prosecutor',
        next: 'defense_explain_clock'
    },
    {
        id: 'defense_explain_clock',
        speaker: '弁護士（あなた）',
        text: '証人は「古時計の音を聞いた」と言いました。しかし、被害者宅の古時計は...10年前から壊れて動かないのです！',
        character: 'defense_attorney',
        next: 'witness_breakdown'
    },
    {
        id: 'witness_breakdown',
        speaker: '証人',
        text: 'きゃああああ！...そ、それは...その...！',
        character: 'witness',
        next: 'prosecutor_recovery'
    },
    // --- ここから追加シナリオ ---
    {
        id: 'prosecutor_recovery',
        speaker: '検察官',
        text: 'くっ...確かに時計は壊れていたかもしれない。だが、それは些細な勘違いだ！',
        character: 'prosecutor',
        next: 'prosecutor_new_point'
    },
    {
        id: 'prosecutor_new_point',
        speaker: '検察官',
        text: '重要なのは、彼女が被告人が凶器のブロンズ像を持っているのを見た、という事実だ！',
        character: 'prosecutor',
        next: 'witness_confirm_weapon'
    },
    {
        id: 'witness_confirm_weapon',
        speaker: '証人',
        text: 'そ、そうです！私、見ました！被告人があの重いブロンズ像を、両手でしっかりと握りしめているのを！',
        character: 'witness',
        next: 'defense_thinking_weapon'
    },
    {
        id: 'defense_thinking_weapon',
        speaker: '弁護士（あなた）',
        text: '（ブロンズ像を両手で握りしめていた...？ここに新たな矛盾があるかもしれない。）',
        character: 'defense_attorney',
        choices: [
            { text: '指紋について尋ねる', next: 'ask_fingerprints' },
            { text: '被告人の体質について', next: 'ask_allergy' }
        ]
    },
    // 分岐：指紋（ハズレ）
    {
        id: 'ask_fingerprints',
        speaker: '弁護士（あなた）',
        text: 'ブロンズ像から指紋は出たのですか？',
        character: 'defense_attorney',
        next: 'prosecutor_fingerprints'
    },
    {
        id: 'prosecutor_fingerprints',
        speaker: '検察官',
        text: 'ふふん、残念ながら拭き取られていたようです。しかし、目撃証言があれば十分！',
        character: 'prosecutor',
        next: 'defense_thinking_weapon' // 戻る
    },
    // 分岐：体質（正解）
    {
        id: 'ask_allergy',
        speaker: '弁護士（あなた）',
        text: '証人、あなたは被告人が「素手」で像を持っていたと言いましたね？',
        character: 'defense_attorney',
        next: 'witness_bare_hands'
    },
    {
        id: 'witness_bare_hands',
        speaker: '証人',
        text: 'はい、間違いありません。素手で、しっかりと...。',
        character: 'witness',
        next: 'defense_objection_allergy'
    },
    {
        id: 'defense_objection_allergy',
        speaker: '弁護士（あなた）',
        text: '異議あり！！それはあり得ません！',
        character: 'defense_attorney',
        cutIn: 'objection', // カットイン演出
        next: 'defense_explain_allergy'
    },
    {
        id: 'defense_explain_allergy',
        speaker: '弁護士（あなた）',
        text: 'なぜなら、被告人は重度の「金属アレルギー」だからです！',
        character: 'defense_attorney',
        next: 'prosecutor_shock_2'
    },
    {
        id: 'prosecutor_shock_2',
        speaker: '検察官',
        text: 'な、なんだってー！？',
        character: 'prosecutor',
        next: 'defense_explain_allergy_2'
    },
    {
        id: 'defense_explain_allergy_2',
        speaker: '弁護士（あなた）',
        text: '彼は普段から手袋を欠かしません。素手でブロンズ像を持てば、すぐに手が腫れ上がってしまうのです！',
        character: 'defense_attorney',
        next: 'witness_breakdown_final'
    },
    {
        id: 'witness_breakdown_final',
        speaker: '証人',
        text: 'ひぃぃぃ！...ごめんなさい！嘘をついていました！',
        character: 'witness',
        next: 'witness_confession'
    },
    {
        id: 'witness_confession',
        speaker: '証人',
        text: '本当は...私が像を落としてしまって...旦那様が...ううっ...。',
        character: 'witness',
        next: 'judge_final_verdict'
    },
    {
        id: 'judge_final_verdict',
        speaker: '裁判長',
        text: '真実は明らかになったようですね。被告人に無罪を言い渡します！',
        character: 'judge',
        next: 'good_end'
    },
    {
        id: 'good_end',
        speaker: 'システム',
        text: '【完全勝利】真犯人を暴き、依頼人を救いました！おめでとうございます！',
        character: null,
        next: null
    }
];

const evidenceList = [
    { id: 'clock', name: '古時計', description: '現場の書斎にある大きな古時計。10年前から壊れていて動かない。' },
    { id: 'report', name: '診断書', description: '被告人の診断書。重度の金属アレルギーがあり、金属に触れると皮膚が腫れ上がる。' },
    { id: 'statue', name: 'ブロンズ像', description: '凶器として使われた重い像。指紋は拭き取られていた。' }
];
