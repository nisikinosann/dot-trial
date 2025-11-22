// ============================================================================
// 第1部：開廷・事件概要・被告の否認
// ============================================================================

const scenario = [

    // -----------------------------------------
    // 開廷
    // -----------------------------------------

    {
        id: 'start',
        speaker: '裁判長',
        text: 'これより、町指定文化財「江戸期の刀」消失事件について審理を開始します。',
        character: 'judge',
        next: 'prosecutor_open_1'
    },

    // -----------------------------------------
    // 冒頭陳述
    // -----------------------------------------

    {
        id: 'prosecutor_open_1',
        speaker: '検察官',
        text: '本件は、町資料保存課が管理する古民家「高瀬家住宅」で発生した盗難事件です。',
        character: 'prosecutor',
        next: 'prosecutor_open_2'
    },

    {
        id: 'prosecutor_open_2',
        speaker: '検察官',
        text: '被害品は江戸後期の刀。「備前長船派」に属するとされ、推定価値は500万円以上。',
        character: 'prosecutor',
        next: 'prosecutor_open_3'
    },

    {
        id: 'prosecutor_open_3',
        speaker: '検察官',
        text: '消失は朝6時、開館準備に来た長坂管理人によって発見されました。',
        character: 'prosecutor',
        next: 'prosecutor_open_4'
    },

    {
        id: 'prosecutor_open_4',
        speaker: '検察官',
        text: '刀が消えた展示室は夜間無人。外鍵は施錠されたまま……完全な密室です。',
        character: 'prosecutor',
        next: 'prosecutor_open_5'
    },

    {
        id: 'prosecutor_open_5',
        speaker: '検察官',
        text: '現場付近で見つかった足跡と指紋は、被告人ミナミのものと一致しています。',
        character: 'prosecutor',
        next: 'defense_open_1'
    },

    // -----------------------------------------
    // 弁護士の内心（あなた）
    // -----------------------------------------

    {
        id: 'defense_open_1',
        speaker: '弁護士（あなた）',
        text: '（ミナミ……彼は保存課のアルバイト。本気で文化財を盗むような人間ではない）',
        character: 'defense_attorney',
        next: 'defense_open_2'
    },

    {
        id: 'defense_open_2',
        speaker: '弁護士（あなた）',
        text: '（密室で刀が消えるなんて……何か別の仕掛けがあるはずだ）',
        character: 'defense_attorney',
        next: 'judge_call_defendant'
    },

    // -----------------------------------------
    // 被告人・ミナミの証言
    // -----------------------------------------

    {
        id: 'judge_call_defendant',
        speaker: '裁判長',
        text: '被告人ミナミ、証言台へ。',
        character: 'judge',
        next: 'minami_enter'
    },

    {
        id: 'minami_enter',
        speaker: '被告人（ミナミ）',
        text: '……僕は、絶対に盗んでいません！ あの日は清掃と施錠チェックをしただけです！',
        character: 'suspect',
        next: 'prosecutor_question_minami_1'
    },

    {
        id: 'prosecutor_question_minami_1',
        speaker: '検察官',
        text: 'では問います。あなたは事件前夜、古民家に“戻ってきた”のでは？',
        character: 'prosecutor',
        next: 'minami_answer_1'
    },

    {
        id: 'minami_answer_1',
        speaker: '被告人（ミナミ）',
        text: '戻っていません！……ただ、鍵の管理が不安で、家に着いてからめちゃくちゃ心配になって……',
        character: 'suspect',
        next: 'minami_answer_2'
    },

    {
        id: 'minami_answer_2',
        speaker: '被告人（ミナミ）',
        text: 'でも結局、戻らず寝ました。本当に寝ただけです！',
        character: 'suspect',
        next: 'defense_comment_1'
    },

    {
        id: 'defense_comment_1',
        speaker: '弁護士（あなた）',
        text: '（ミナミの足跡と指紋があったのは、清掃業務ゆえだろう。状況証拠が悪すぎる）',
        character: 'defense_attorney',
        next: 'judge_call_first_witness'
    },

    // -----------------------------------------
    // 第1証人：古民家管理人・長坂
    // -----------------------------------------

    {
        id: 'judge_call_first_witness',
        speaker: '裁判長',
        text: 'それでは第一証人として、古民家管理人の長坂氏を呼びます。',
        character: 'judge',
        next: 'nagasaka_enter'
    },

    {
        id: 'nagasaka_enter',
        speaker: '証人（長坂）',
        text: '長坂だ。文化財を預かる者として……この事件は許せん！',
        character: 'witness_nagasaka',
        next: 'nagasaka_testimony_1'
    },

    {
        id: 'nagasaka_testimony_1',
        speaker: '証人（長坂）',
        text: 'ワシは毎朝6時に古民家へ来る。展示室の鍵を開けたら……刀が、無かったんじゃ……！',
        character: 'witness_nagasaka',
        next: 'nagasaka_testimony_2'
    },

    {
        id: 'nagasaka_testimony_2',
        speaker: '証人（長坂）',
        text: '閉館後はワシが戸締まりを全部確認する。夜に誰かが入った痕跡なんぞ無い！',
        character: 'witness_nagasaka',
        next: 'nagasaka_testimony_3'
    },

    {
        id: 'nagasaka_testimony_3',
        speaker: '証人（長坂）',
        text: 'つまりじゃ、被告人ミナミが鍵を持っていた以上、犯人はミナミしかおらん！',
        character: 'witness_nagasaka',
        next: 'defense_cross_nagasaka_intro'
    },

    // -----------------------------------------
    // 反対尋問の導入
    // -----------------------------------------

    {
        id: 'defense_cross_nagasaka_intro',
        speaker: '弁護士（あなた）',
        text: '（長坂管理人……頑固で責任感も強いが、何かを隠しているようにも見える）',
        character: 'defense_attorney',
        next: 'defense_cross_nagasaka_menu'
    },

    // -----------------------------------------
    // ★反対尋問メニュー（3択・戻らない仕様）
    // -----------------------------------------

    {
        id: 'defense_cross_nagasaka_menu',
        speaker: '弁護士（あなた）',
        text: '（どこから矛盾を引き出す？）',
        character: 'defense_attorney',
        choices: [
            { text: '夜間の巡回について質問する', next: 'ask_nagasaka_night' },
            { text: '展示室の鍵について聞く', next: 'ask_nagasaka_key' },
            { text: '閉館作業の詳細について聞く', next: 'ask_nagasaka_closing' }
        ]
    },

    // -----------------------------------------
    // 夜間巡回
    // -----------------------------------------

    {
        id: 'ask_nagasaka_night',
        speaker: '弁護士（あなた）',
        text: '夜間の巡回はどのように行っていましたか？',
        character: 'defense_attorney',
        next: 'nagasaka_reply_night'
    },

    {
        id: 'nagasaka_reply_night',
        speaker: '証人（長坂）',
        text: '巡回などしとらん！ ワシは最後に見た後、鍵を閉めて帰るだけじゃ！',
        character: 'witness_nagasaka',
        next: 'defense_flag_night'
    },

    {
        id: 'defense_flag_night',
        speaker: '弁護士（あなた）',
        text: '（巡回をしていない……つまり、閉館後の見回りは実質ゼロ……？）',
        character: 'defense_attorney',
        next: 'defense_continue_after_choice'
    },

    // -----------------------------------------
    // 展示室の鍵
    // -----------------------------------------

    {
        id: 'ask_nagasaka_key',
        speaker: '弁護士（あなた）',
        text: '展示室の鍵はどのように管理されていましたか？',
        character: 'defense_attorney',
        next: 'nagasaka_reply_key'
    },

    {
        id: 'nagasaka_reply_key',
        speaker: '証人（長坂）',
        text: '展示室の鍵はワシの腰から離したことはない。ミナミには館全体の合鍵しか渡しておらん！',
        character: 'witness_nagasaka',
        next: 'defense_flag_key'
    },

    {
        id: 'defense_flag_key',
        speaker: '弁護士（あなた）',
        text: '（つまりミナミは展示室の鍵を持っていない……？）',
        character: 'defense_attorney',
        next: 'defense_continue_after_choice'
    },

    // -----------------------------------------
    // 閉館作業
    // -----------------------------------------

    {
        id: 'ask_nagasaka_closing',
        speaker: '弁護士（あなた）',
        text: '閉館作業の流れを細かく教えてください。',
        character: 'defense_attorney',
        next: 'nagasaka_reply_closing'
    },

    {
        id: 'nagasaka_reply_closing',
        speaker: '証人（長坂）',
        text: '展示室、裏口、縁側……全部ワシが閉めた！ それから道具置き場に寄って帰った！',
        character: 'witness_nagasaka',
        next: 'defense_flag_closing'
    },

    {
        id: 'defense_flag_closing',
        speaker: '弁護士（あなた）',
        text: '（道具置き場……？ わざわざ寄る必要があったのか？）',
        character: 'defense_attorney',
        next: 'defense_continue_after_choice'
    },

    // -----------------------------------------
    // 次章へ
    // -----------------------------------------

    {
        id: 'defense_continue_after_choice',
        speaker: '弁護士（あなた）',
        text: '（長坂の証言に、必ず何か矛盾が潜んでいる……次に繋がるはずだ）',
        character: 'defense_attorney',
        next: 'chapter1_end'
    },

    {
        id: 'chapter1_end',
        speaker: 'システム',
        text: '【第1部終了】 次は、第2証人：歴史サークルの大学生・川嶋の登場だ。',
        character: null,
        next: null
    },

    // ============================================================================
    // 第2部：証人2・歴史サークル大学生 川嶋
    // ============================================================================

    {
        id: 'chapter2_start',
        speaker: '裁判長',
        text: '続いて、第二証人。歴史サークル所属の大学生、川嶋さんを呼びます。',
        character: 'judge',
        next: 'kawashima_enter'
    },

    {
        id: 'kawashima_enter',
        speaker: '証人（川嶋）',
        text: 'えっと……川嶋です。古民家の歴史、大好きで……毎週来てます。',
        character: 'witness_kawashima',
        next: 'kawashima_testimony_1'
    },

    // -----------------------------------------
    // 川嶋の証言
    // -----------------------------------------

    {
        id: 'kawashima_testimony_1',
        speaker: '証人（川嶋）',
        text: '事件の前日は、僕、刀の展示台の写真を撮ってました。卒論の資料で……。',
        character: 'witness_kawashima',
        next: 'kawashima_testimony_2'
    },

    {
        id: 'kawashima_testimony_2',
        speaker: '証人（川嶋）',
        text: 'その時は刀はちゃんとありました。展示台の中央に、まっすぐ置かれてました。',
        character: 'witness_kawashima',
        next: 'kawashima_testimony_3'
    },

    {
        id: 'kawashima_testimony_3',
        speaker: '証人（川嶋）',
        text: 'でも……なんか、台の位置が少し“斜め”に見えたんですよね……写真で確認して気づいたんですけど。',
        character: 'witness_kawashima',
        next: 'kawashima_testimony_4'
    },

    {
        id: 'kawashima_testimony_4',
        speaker: '証人（川嶋）',
        text: 'それと、閉館前、縁側のあたりから“カンッ”って何かが落ちたような音がしました。',
        character: 'witness_kawashima',
        next: 'defense_cross_kawashima_intro'
    },

    // -----------------------------------------
    // 弁護側（あなた）の内心
    // -----------------------------------------

    {
        id: 'defense_cross_kawashima_intro',
        speaker: '弁護士（あなた）',
        text: '（展示台のズレ……落下音……それに刀が消えた密室）',
        character: 'defense_attorney',
        next: 'defense_cross_kawashima_menu'
    },

    // -----------------------------------------
    // ★反対尋問メニュー（3択・戻らない）
    // -----------------------------------------

    {
        id: 'defense_cross_kawashima_menu',
        speaker: '弁護士（あなた）',
        text: '（川嶋の証言……どこを深掘りする？）',
        character: 'defense_attorney',
        choices: [
            { text: '撮影した写真について詳しく', next: 'ask_kawashima_photo' },
            { text: '縁側の“音”について聞く', next: 'ask_kawashima_sound' },
            { text: '展示台のズレについて探る', next: 'ask_kawashima_shift' }
        ]
    },

    // -----------------------------------------
    // 写真について
    // -----------------------------------------

    {
        id: 'ask_kawashima_photo',
        speaker: '弁護士（あなた）',
        text: 'あなたが撮影した写真……それには展示台の何が写っていましたか？',
        character: 'defense_attorney',
        next: 'kawashima_reply_photo'
    },

    {
        id: 'kawashima_reply_photo',
        speaker: '証人（川嶋）',
        text: 'あ、はい。展示台がちょっとだけ斜めになってるのがわかります。床の線と比べて……。',
        character: 'witness_kawashima',
        next: 'defense_flag_photo'
    },

    {
        id: 'defense_flag_photo',
        speaker: '弁護士（あなた）',
        text: '（展示台が斜め……。つまり刀を盗む前に“事前工作”があった可能性）',
        character: 'defense_attorney',
        next: 'defense_continue_kawashima'
    },

    // -----------------------------------------
    // 音について
    // -----------------------------------------

    {
        id: 'ask_kawashima_sound',
        speaker: '弁護士（あなた）',
        text: '閉館前に聞いた“カンッ”という音……詳しく教えてください。',
        character: 'defense_attorney',
        next: 'kawashima_reply_sound'
    },

    {
        id: 'kawashima_reply_sound',
        speaker: '証人（川嶋）',
        text: 'あれは……金属が落ちるような音でした。刀に関係あるのかはわからないけど。',
        character: 'witness_kawashima',
        next: 'defense_flag_sound'
    },

    {
        id: 'defense_flag_sound',
        speaker: '弁護士（あなた）',
        text: '（金属の落下音……。展示台は棚の上、刀は金属……関係があるかもしれない）',
        character: 'defense_attorney',
        next: 'defense_continue_kawashima'
    },

    // -----------------------------------------
    // 展示台のズレについて
    // -----------------------------------------

    {
        id: 'ask_kawashima_shift',
        speaker: '弁護士（あなた）',
        text: '展示台のズレは、どの程度だったのですか？',
        character: 'defense_attorney',
        next: 'kawashima_reply_shift'
    },

    {
        id: 'kawashima_reply_shift',
        speaker: '証人（川嶋）',
        text: '真横から見てわかるほどじゃないけど……床の格子と台の足の位置が少しズレてました。',
        character: 'witness_kawashima',
        next: 'defense_flag_shift'
    },

    {
        id: 'defense_flag_shift',
        speaker: '弁護士（あなた）',
        text: '（ズレは“何かを引いた痕跡”か……台そのものを動かした？）',
        character: 'defense_attorney',
        next: 'defense_continue_kawashima'
    },

    // -----------------------------------------
    // 川嶋の核心に近づく
    // -----------------------------------------

    {
        id: 'defense_continue_kawashima',
        speaker: '弁護士（あなた）',
        text: '（川嶋は何かを知っている……だが言わない。第三者の存在か……？）',
        character: 'defense_attorney',
        next: 'defense_kawashima_last'
    },

    {
        id: 'defense_kawashima_last',
        speaker: '弁護士（あなた）',
        text: '（次は、“本当に誰が展示室に入れたのか”を探る必要がある。第三証人……大工の石動だ）',
        character: 'defense_attorney',
        next: 'chapter2_end'
    },

    {
        id: 'chapter2_end',
        speaker: 'システム',
        text: '【第2部終了】次は重要人物、古民家を修繕していた大工・石動の証言だ。',
        character: null,
        next: null
    },
    // ============================================================================
    // 第3部：証人3・大工 石動（いするぎ）
    // ============================================================================


    {
        id: 'chapter3_start',
        speaker: '裁判長',
        text: 'それでは、第三証人──古民家の修繕を担当していた石動（いするぎ）氏を呼びます。',
        character: 'judge',
        next: 'isurugi_enter'
    },

    {
        id: 'isurugi_enter',
        speaker: '証人（石動）',
        text: '……ああ、石動だ。古民家の壁も梁も、この手で全部見てきた。',
        character: 'witness_isurugi',
        next: 'isurugi_testimony_1'
    },

    // -----------------------------------------
    // 石動の証言
    // -----------------------------------------

    {
        id: 'isurugi_testimony_1',
        speaker: '証人（石動）',
        text: 'あの展示室は頑丈に見えるが、実は昔ながらの作りでな……内部に“空洞”が多い。',
        character: 'witness_isurugi',
        next: 'isurugi_testimony_2'
    },

    {
        id: 'isurugi_testimony_2',
        speaker: '証人（石動）',
        text: '特に、南側の壁の奥には、江戸期の“旧通気口”が残っている。今は表面上はふさがれてるはずだがな。',
        character: 'witness_isurugi',
        next: 'isurugi_testimony_3'
    },

    {
        id: 'isurugi_testimony_3',
        speaker: '証人（石動）',
        text: 'だが……事件の三日前。俺はその通気口の修繕を頼まれた。誰に、とは……言わん。',
        character: 'witness_isurugi',
        next: 'isurugi_testimony_4'
    },

    {
        id: 'isurugi_testimony_4',
        speaker: '証人（石動）',
        text: 'まあ、言えるのは……“展示室の中に入らずに手を伸ばせる穴”が、確かに存在したということだ。',
        character: 'witness_isurugi',
        next: 'defense_cross_isurugi_intro'
    },

    // -----------------------------------------
    // 弁護側（あなた）の内心
    // -----------------------------------------

    {
        id: 'defense_cross_isurugi_intro',
        speaker: '弁護士（あなた）',
        text: '（旧通気口……展示台のズレ……落下音……すべてがつながってきた）',
        character: 'defense_attorney',
        next: 'defense_cross_isurugi_menu'
    },

    // -----------------------------------------
    // ★反対尋問メニュー（3択・分岐後は戻らない）
    // -----------------------------------------

    {
        id: 'defense_cross_isurugi_menu',
        speaker: '弁護士（あなた）',
        text: '（石動の証言……どこを掘り下げる？）',
        character: 'defense_attorney',
        choices: [
            { text: '旧通気口について詳しく', next: 'ask_isurugi_vent' },
            { text: '「頼んだ人物」について探る', next: 'ask_isurugi_requester' },
            { text: '修繕作業の詳細を聞く', next: 'ask_isurugi_work' }
        ]
    },

    // -----------------------------------------
    // 旧通気口の説明
    // -----------------------------------------

    {
        id: 'ask_isurugi_vent',
        speaker: '弁護士（あなた）',
        text: '旧通気口は、どの程度の大きさだったのですか？',
        character: 'defense_attorney',
        next: 'isurugi_reply_vent'
    },

    {
        id: 'isurugi_reply_vent',
        speaker: '証人（石動）',
        text: '拳ひとつ分だな。道具が通せる。細工すりゃ、何かを“押す”くらいはできる。',
        character: 'witness_isurugi',
        next: 'isurugi_flag_vent'
    },

    {
        id: 'isurugi_flag_vent',
        speaker: '弁護士（あなた）',
        text: '（展示台を押してズラす──事前に位置を操作した可能性が高い）',
        character: 'defense_attorney',
        next: 'defense_continue_isurugi'
    },

    // -----------------------------------------
    // 「頼んだ人物」について
    // -----------------------------------------

    {
        id: 'ask_isurugi_requester',
        speaker: '弁護士（あなた）',
        text: 'その旧通気口の修繕を、誰に頼まれたのですか？',
        character: 'defense_attorney',
        next: 'isurugi_reply_requester'
    },

    {
        id: 'isurugi_reply_requester',
        speaker: '証人（石動）',
        text: '……名前は出さん。だが“古民家の鍵を自由に扱える人物”だったな。',
        character: 'witness_isurugi',
        next: 'isurugi_flag_requester'
    },

    {
        id: 'isurugi_flag_requester',
        speaker: '弁護士（あなた）',
        text: '（鍵を扱える人物……長坂管理人か……助手のミナミか……）',
        character: 'defense_attorney',
        next: 'defense_continue_isurugi'
    },

    // -----------------------------------------
    // 修繕作業について
    // -----------------------------------------

    {
        id: 'ask_isurugi_work',
        speaker: '弁護士（あなた）',
        text: '修繕作業の詳細を教えてください。通気口はどう処理したのですか？',
        character: 'defense_attorney',
        next: 'isurugi_reply_work'
    },

    {
        id: 'isurugi_reply_work',
        speaker: '証人（石動）',
        text: '板で塞いで、上から古い壁の材を貼り直した。外見じゃまずわからん。',
        character: 'witness_isurugi',
        next: 'isurugi_flag_work'
    },

    {
        id: 'isurugi_flag_work',
        speaker: '弁護士（あなた）',
        text: '（つまり、犯人は“内部構造を知っている人物”……）',
        character: 'defense_attorney',
        next: 'defense_continue_isurugi'
    },

    // -----------------------------------------
    // 核心に踏み込む
    // -----------------------------------------

    {
        id: 'defense_continue_isurugi',
        speaker: '弁護士（あなた）',
        text: '（そろそろ“決定的な矛盾”を突くべきだ……）',
        character: 'defense_attorney',
        next: 'defense_present_menu_isurugi'
    },

    // -----------------------------------------
    // ★証拠品提示メニュー（3つ成功・2つフェイク）
    // 正解は “旧通気口の図面”
    // 他の2つの本物はまだ後半で使用予定
    // -----------------------------------------

    {
        id: 'defense_present_menu_isurugi',
        speaker: '弁護士（あなた）',
        text: '石動さん、あなたの証言には重大な矛盾があります──証拠を示します。',
        character: 'defense_attorney',
        choices: [
            { text: '通気口の図面を提示する', action: 'present_evidence', evidenceId: 'old_vent_map', next: 'correct_isurugi_1' },
            { text: '歴史サークルの出欠表を提示', action: 'present_evidence', evidenceId: 'circle_attendance', next: 'wrong_isurugi_1' },
            { text: '観光パンフを提示', action: 'present_evidence', evidenceId: 'tourist_pamphlet', next: 'wrong_isurugi_1' }
        ]
    },

    // -----------------------------------------
    // 失敗（フェイル）
    // -----------------------------------------

    {
        id: 'wrong_isurugi_1',
        speaker: '裁判長',
        text: '弁護人、その証拠は本件とは関連性が薄いように思えます。',
        character: 'judge',
        next: 'defense_present_menu_isurugi'
    },

    // -----------------------------------------
    // 成功（異議あり発動）
    // -----------------------------------------

    {
        id: 'correct_isurugi_1',
        speaker: '弁護士（あなた）',
        text: '──石動さん！ この「旧通気口の図面」をご覧ください！',
        character: 'defense_attorney',
        cutIn: 'objection',
        next: 'isurugi_shock_1'
    },

    {
        id: 'isurugi_shock_1',
        speaker: '証人（石動）',
        text: 'なっ……お前、どこでそれを……！',
        character: 'witness_isurugi',
        next: 'defense_explain_isurugi_1'
    },

    {
        id: 'defense_explain_isurugi_1',
        speaker: '弁護士（あなた）',
        text: '図面には“展示台に届く位置”まで旧通気口が伸びていると記されています！',
        character: 'defense_attorney',
        next: 'defense_explain_isurugi_2'
    },

    {
        id: 'defense_explain_isurugi_2',
        speaker: '弁護士（あなた）',
        text: 'あなたが修繕したと言いながら、事件当夜その通気口は“完全にはふさがれていなかった”！',
        character: 'defense_attorney',
        next: 'isurugi_break'
    },

    {
        id: 'isurugi_break',
        speaker: '証人（石動）',
        text: '……っ、ああ……それは……！',
        character: 'witness_isurugi',
        next: 'chapter3_end'
    },

    {
        id: 'chapter3_end',
        speaker: 'システム',
        text: '【第3部終了】通気口トリックが明らかに──いよいよ真相に近づく。',
        character: null,
        next: null
    },
    // ============================================================================
    // 第4部：旧通気口トリックの実行・矛盾の結合
    // ============================================================================

    {
        id: 'chapter4_start',
        speaker: '裁判長',
        text: 'さて弁護側、先ほどの証人・石動氏の証言を踏まえ、さらに意見はありますか？',
        character: 'judge',
        next: 'defense_reflect_1'
    },

    {
        id: 'defense_reflect_1',
        speaker: '弁護士（あなた）',
        text: '（旧通気口の存在……展示台のズレ……落下音……そして鍵）',
        character: 'defense_attorney',
        next: 'defense_reflect_2'
    },

    {
        id: 'defense_reflect_2',
        speaker: '弁護士（あなた）',
        text: '（犯人は、展示室に入らずに刀を落として回収した……そう考えると全てがつながる）',
        character: 'defense_attorney',
        next: 'judge_request_summary'
    },

    {
        id: 'judge_request_summary',
        speaker: '裁判長',
        text: '弁護人、証言の整理をお願いします。',
        character: 'judge',
        next: 'defense_summary_1'
    },

    // -----------------------------------------
    // 証言の整理
    // -----------------------------------------

    {
        id: 'defense_summary_1',
        speaker: '弁護士（あなた）',
        text: 'まず、川嶋さんが見た「展示台のズレ」。些細に見えて、重要な手掛かりです。',
        character: 'defense_attorney',
        next: 'defense_summary_2'
    },

    {
        id: 'defense_summary_2',
        speaker: '弁護士（あなた）',
        text: '次に、閉館前に聞いた「金属が落ちるような音」。これは、刀が展示台から何かに引かれて倒れた音と考えられます。',
        character: 'defense_attorney',
        next: 'defense_summary_3'
    },

    {
        id: 'defense_summary_3',
        speaker: '弁護士（あなた）',
        text: 'そして石動氏が修繕した「旧通気口」。内部の空洞が展示台の真下まで続いていました。',
        character: 'defense_attorney',
        next: 'defense_summary_4'
    },

    {
        id: 'defense_summary_4',
        speaker: '弁護士（あなた）',
        text: 'つまり犯人は、旧通気口から“棒状の道具”を差し込み──展示台を押して傾かせた。',
        character: 'defense_attorney',
        next: 'prosecutor_interruption_1'
    },

    // -----------------------------------------
    // 検察の反論
    // -----------------------------------------

    {
        id: 'prosecutor_interruption_1',
        speaker: '検察官',
        text: '待ってください！ 通気口はふさがれていたはず！ 三日前に工事したと言ったじゃないか！',
        character: 'prosecutor',
        next: 'defense_rebuttal_1'
    },

    {
        id: 'defense_rebuttal_1',
        speaker: '弁護士（あなた）',
        text: '石動さんは「板で塞いだ」と証言しました。しかし穴の奥の空洞までは完全に埋めていない。',
        character: 'defense_attorney',
        next: 'defense_rebuttal_2'
    },

    {
        id: 'defense_rebuttal_2',
        speaker: '弁護士（あなた）',
        text: 'さらに──“通気口の板は簡単に外れた”可能性があります。',
        character: 'defense_attorney',
        next: 'isurugi_conflict'
    },

    {
        id: 'isurugi_conflict',
        speaker: '証人（石動）',
        text: 'おい、勝手に決めつけるな！ ちゃんと釘で固定したんだぞ！',
        character: 'witness_isurugi',
        next: 'defense_think_isurugi'
    },

    {
        id: 'defense_think_isurugi',
        speaker: '弁護士（あなた）',
        text: '（釘……か。だが、その釘は本当に“そこにあった”のか？）',
        character: 'defense_attorney',
        next: 'defense_cross_isurugi_menu_2'
    },

    // -----------------------------------------
    // 二度目の反対尋問（3択）
    // -----------------------------------------

    {
        id: 'defense_cross_isurugi_menu_2',
        speaker: '弁護士（あなた）',
        text: '（石動の主張の“弱い部分”はどこだ……？）',
        character: 'defense_attorney',
        choices: [
            { text: '修繕当日の作業工程について', next: 'ask_isurugi_process' },
            { text: '釘の本数や状態について', next: 'ask_isurugi_nail' },
            { text: '通気口周辺の痕跡について', next: 'ask_isurugi_trace' }
        ]
    },

    // -----------------------------------------
    // 作業工程について
    // -----------------------------------------

    {
        id: 'ask_isurugi_process',
        speaker: '弁護士（あなた）',
        text: '修繕当日は、どんな手順で通気口をふさいだのですか？',
        character: 'defense_attorney',
        next: 'isurugi_reply_process'
    },

    {
        id: 'isurugi_reply_process',
        speaker: '証人（石動）',
        text: '古板を外して、新しい板をあてがって釘を打ち直した。それだけだ。',
        character: 'witness_isurugi',
        next: 'defense_flag_process'
    },

    {
        id: 'defense_flag_process',
        speaker: '弁護士（あなた）',
        text: '（作業は単純……逆に言えば、外すのも“簡単”だった可能性）',
        character: 'defense_attorney',
        next: 'defense_pre_evidence2'
    },

    // -----------------------------------------
    // 釘について
    // -----------------------------------------

    {
        id: 'ask_isurugi_nail',
        speaker: '弁護士（あなた）',
        text: '釘は何本打ち、どの状態で固定されていましたか？',
        character: 'defense_attorney',
        next: 'isurugi_reply_nail'
    },

    {
        id: 'isurugi_reply_nail',
        speaker: '証人（石動）',
        text: '……4本だ。板の四隅にな。普通に打てば絶対外れん。',
        character: 'witness_isurugi',
        next: 'defense_flag_nail'
    },

    {
        id: 'defense_flag_nail',
        speaker: '弁護士（あなた）',
        text: '（四隅……だが川嶋は“斜めのズレ”を見た。四点固定ならそんなズレ方はしないはずだ）',
        character: 'defense_attorney',
        next: 'defense_pre_evidence2'
    },

    // -----------------------------------------
    // 痕跡について
    // -----------------------------------------

    {
        id: 'ask_isurugi_trace',
        speaker: '弁護士（あなた）',
        text: '通気口周辺に、作業後に不審な痕跡はありませんでしたか？',
        character: 'defense_attorney',
        next: 'isurugi_reply_trace'
    },

    {
        id: 'isurugi_reply_trace',
        speaker: '証人（石動）',
        text: '埃っぽかったが……それがどうした。',
        character: 'witness_isurugi',
        next: 'defense_flag_trace'
    },

    {
        id: 'defense_flag_trace',
        speaker: '弁護士（あなた）',
        text: '（埃……つまり“内部”を誰かが触った痕跡が残りやすい）',
        character: 'defense_attorney',
        next: 'defense_pre_evidence2'
    },

    // -----------------------------------------
    // 第二回 証拠提示
    // 正解：展示台写真（ズレと釘の位置の矛盾を指摘）
    // -----------------------------------------

    {
        id: 'defense_pre_evidence2',
        speaker: '弁護士（あなた）',
        text: '（ここで“決定的矛盾”を突く……第二の証拠だ）',
        character: 'defense_attorney',
        next: 'defense_present_menu2'
    },

    {
        id: 'defense_present_menu2',
        speaker: '弁護士（あなた）',
        text: '石動さん──あなたの証言には、物理的に不可能な部分があります。',
        character: 'defense_attorney',
        choices: [
            { text: '展示台の写真を提示する', action: 'present_evidence', evidenceId: 'stand_photo', next: 'correct_evidence2' },
            { text: '歴史サークル出欠表（フェイク）', action: 'present_evidence', evidenceId: 'circle_attendance', next: 'wrong_evidence2' },
            { text: '観光パンフ（フェイク）', action: 'present_evidence', evidenceId: 'tourist_pamphlet', next: 'wrong_evidence2' }
        ]
    },

    // -----------------------------------------
    // 失敗
    // -----------------------------------------

    {
        id: 'wrong_evidence2',
        speaker: '裁判長',
        text: '弁護人、その提示は事件の核心とは関係が薄いように思えます。',
        character: 'judge',
        next: 'defense_present_menu2'
    },

    // -----------------------------------------
    // 成功（異議あり）
    // -----------------------------------------

    {
        id: 'correct_evidence2',
        speaker: '弁護士（あなた）',
        text: '──石動さん！ この「展示台の写真」を見てください！',
        character: 'defense_attorney',
        cutIn: 'objection',
        next: 'isurugi_shock2'
    },

    {
        id: 'isurugi_shock2',
        speaker: '証人（石動）',
        text: 'な、なんだと……！ これは……！',
        character: 'witness_isurugi',
        next: 'defense_explain2_1'
    },

    {
        id: 'defense_explain2_1',
        speaker: '弁護士（あなた）',
        text: '展示台は“斜め”にズレています。しかし、あなたの言うように四隅を釘で打っていたのなら……こんなズレは起きない。',
        character: 'defense_attorney',
        next: 'defense_explain2_2'
    },

    {
        id: 'defense_explain2_2',
        speaker: '弁護士（あなた）',
        text: 'つまり──あなたは釘を四隅に打っていない！ 通気口は“意図的に”外せる状態だった！',
        character: 'defense_attorney',
        next: 'isurugi_crack'
    },

    {
        id: 'isurugi_crack',
        speaker: '証人（石動）',
        text: '……くっ……！ そ、それは……！',
        character: 'witness_isurugi',
        next: 'chapter4_end'
    },

    {
        id: 'chapter4_end',
        speaker: 'システム',
        text: '【第4部終了】犯人は“通気口を意図的に残した人物”──次は事件全体の総まとめ。',
        character: null,
        next: null
    },
    // ============================================================================
    // 第5部：真犯人の指摘・逆転パート
    // ============================================================================

    {
        id: 'chapter5_start',
        speaker: '裁判長',
        text: '弁護人、ここまでの証言を総合すると……通気口が犯行に使用された可能性が高まっています。',
        character: 'judge',
        next: 'defense_final_intro_1'
    },

    {
        id: 'defense_final_intro_1',
        speaker: '弁護士（あなた）',
        text: '（そう──旧通気口は“意図的に残されていた”。そしてそれを扱える人物は限られている）',
        character: 'defense_attorney',
        next: 'defense_final_intro_2'
    },

    {
        id: 'defense_final_intro_2',
        speaker: '弁護士（あなた）',
        text: '（通気口を修繕した石動……。鍵の管理者である長坂……。内部構造をよく知る川嶋……）',
        character: 'defense_attorney',
        next: 'defense_final_intro_3'
    },

    {
        id: 'defense_final_intro_3',
        speaker: '弁護士（あなた）',
        text: '（だが──実際に“修繕記録”を残しているのは、たった一人だ）',
        character: 'defense_attorney',
        next: 'judge_prompt_final'
    },

    {
        id: 'judge_prompt_final',
        speaker: '裁判長',
        text: '弁護人、真犯人に心当たりがあると申しますか？',
        character: 'judge',
        next: 'defense_final_statement_1'
    },

    {
        id: 'defense_final_statement_1',
        speaker: '弁護士（あなた）',
        text: 'はい──すべての矛盾を“ひとつの嘘”で説明できる人物がいます。',
        character: 'defense_attorney',
        next: 'defense_final_statement_2'
    },

    {
        id: 'defense_final_statement_2',
        speaker: '弁護士（あなた）',
        text: 'そして、その人物こそ……通気口を意図的に残し、展示台を動かし、刀を盗み出した真犯人です。',
        character: 'defense_attorney',
        next: 'defense_final_menu_suspect'
    },

    // -----------------------------------------
    // 真犯人候補（3択）
    // -----------------------------------------

    {
        id: 'defense_final_menu_suspect',
        speaker: '弁護士（あなた）',
        text: '（さて──誰を指名する？）',
        character: 'defense_attorney',
        choices: [
            { text: '管理人・長坂を指摘する', next: 'accuse_nagasaka' },
            { text: '大学生・川嶋を指摘する', next: 'accuse_kawashima' },
            { text: '大工・石動を指摘する', next: 'accuse_isurugi' }
        ]
    },

    // -----------------------------------------
    // 長坂を誤指摘（バッド）
    // -----------------------------------------

    {
        id: 'accuse_nagasaka',
        speaker: '弁護士（あなた）',
        text: '真犯人は──長坂管理人、あなたです！',
        character: 'defense_attorney',
        next: 'nagasaka_deny'
    },

    {
        id: 'nagasaka_deny',
        speaker: '証人（長坂）',
        text: 'なっ……わ、私が！？　そんなわけ──！',
        character: 'witness_nagasaka',
        next: 'judge_wrong_accuse'
    },

    {
        id: 'judge_wrong_accuse',
        speaker: '裁判長',
        text: '弁護人、その指摘には根拠が薄いように思えます。再度検討しなさい。',
        character: 'judge',
        next: 'defense_final_menu_suspect'
    },

    // -----------------------------------------
    // 川嶋を誤指摘（バッド）
    // -----------------------------------------

    {
        id: 'accuse_kawashima',
        speaker: '弁護士（あなた）',
        text: '真犯人は──川嶋さん、あなたです！',
        character: 'defense_attorney',
        next: 'kawashima_deny'
    },

    {
        id: 'kawashima_deny',
        speaker: '証人（川嶋）',
        text: 'ええっ！？ ぼ、僕が！？ 違いますよ絶対！',
        character: 'witness_kawashima',
        next: 'judge_wrong_accuse_2'
    },

    {
        id: 'judge_wrong_accuse_2',
        speaker: '裁判長',
        text: '弁護人、その指摘は強引すぎます。証拠を再確認しなさい。',
        character: 'judge',
        next: 'defense_final_menu_suspect'
    },

    // -----------------------------------------
    // 石動を指摘（正解）
    // -----------------------------------------

    {
        id: 'accuse_isurugi',
        speaker: '弁護士（あなた）',
        text: '真犯人は──大工の石動さん、あなたです！',
        character: 'defense_attorney',
        next: 'isurugi_react_1'
    },

    {
        id: 'isurugi_react_1',
        speaker: '証人（石動）',
        text: '……ハッ、俺を疑うのか？ 根拠もなく指さすとはな。',
        character: 'witness_isurugi',
        next: 'defense_final_evidence_intro'
    },

    {
        id: 'defense_final_evidence_intro',
        speaker: '弁護士（あなた）',
        text: '根拠ならあります──あなたが唯一“消せなかった痕跡”がある。',
        character: 'defense_attorney',
        next: 'defense_present_menu_final'
    },

    // -----------------------------------------
    // ★最終証拠提示（正解は修繕記録）
    // -----------------------------------------

    {
        id: 'defense_present_menu_final',
        speaker: '弁護士（あなた）',
        text: 'その証拠を、今ここで突き付けます！',
        character: 'defense_attorney',
        choices: [
            { text: '修繕記録を提示する', action: 'present_evidence', evidenceId: 'repair_log', next: 'correct_final_evidence' },
            { text: '観光パンフ（フェイク）', action: 'present_evidence', evidenceId: 'tourist_pamphlet', next: 'wrong_final_evidence' },
            { text: '出欠表（フェイク）', action: 'present_evidence', evidenceId: 'circle_attendance', next: 'wrong_final_evidence' }
        ]
    },

    // -----------------------------------------
    // 失敗
    // -----------------------------------------

    {
        id: 'wrong_final_evidence',
        speaker: '裁判長',
        text: '弁護人、その証拠は事件の核心を説明できません。',
        character: 'judge',
        next: 'defense_present_menu_final'
    },

    // -----------------------------------------
    // 正解（異議あり）
    // -----------------------------------------

    {
        id: 'correct_final_evidence',
        speaker: '弁護士（あなた）',
        text: '──石動さん！ あなたが提出した「修繕記録」には重大な矛盾があります！',
        character: 'defense_attorney',
        cutIn: 'objection',
        next: 'isurugi_shock_final'
    },

    {
        id: 'isurugi_shock_final',
        speaker: '証人（石動）',
        text: 'な……なに……！？ 修繕記録だと……？',
        character: 'witness_isurugi',
        next: 'defense_explain_final_1'
    },

    {
        id: 'defense_explain_final_1',
        speaker: '弁護士（あなた）',
        text: 'あなたは通気口を「四隅を釘で固定した」と証言しました。',
        character: 'defense_attorney',
        next: 'defense_explain_final_2'
    },

    {
        id: 'defense_explain_final_2',
        speaker: '弁護士（あなた）',
        text: 'しかし修繕記録には──“釘は二本しか使われていない”と明記されている！',
        character: 'defense_attorney',
        next: 'isurugi_breakdown_1'
    },

    {
        id: 'isurugi_breakdown_1',
        speaker: '証人（石動）',
        text: '……っ！ な……なぜ……そんな細かいところを……！',
        character: 'witness_isurugi',
        next: 'defense_explain_final_3'
    },

    {
        id: 'defense_explain_final_3',
        speaker: '弁護士（あなた）',
        text: '二本打ちなら、板は簡単に外れる。だからあなたは事件当夜、通気口を開け、棒で展示台を押してズラした！',
        character: 'defense_attorney',
        next: 'defense_explain_final_4'
    },

    {
        id: 'defense_explain_final_4',
        speaker: '弁護士（あなた）',
        text: '展示台が傾き、刀が落ちる──その音を川嶋さんが聞いたのです！',
        character: 'defense_attorney',
        next: 'defense_explain_final_5'
    },

    {
        id: 'defense_explain_final_5',
        speaker: '弁護士（あなた）',
        text: 'あなたは床下の空洞に落ちた刀を回収し、そのまま持ち去った！',
        character: 'defense_attorney',
        next: 'isurugi_breakdown_2'
    },

    {
        id: 'isurugi_breakdown_2',
        speaker: '証人（石動）',
        text: '……あ……あああ……！ くそっ……全部……全部、俺のせいか……！',
        character: 'witness_isurugi',
        next: 'judge_verdict_final'
    },

    // -----------------------------------------
    // 無罪判決
    // -----------------------------------------

    {
        id: 'judge_verdict_final',
        speaker: '裁判長',
        text: '証人・石動の自白と矛盾の指摘により、被告人ミナミの無罪が確定します。',
        character: 'judge',
        next: 'ending'
    },

    {
        id: 'ending',
        speaker: 'システム',
        text: '【逆転勝利】通気口トリックの全貌を暴き、真犯人を見事に追い詰めた！',
        character: null,
        next: null
    }

];


const evidenceList = [

    // ===============================
    // ★本物の証拠（事件解決に必要）
    // ===============================

    {
        id: 'old_vent_map',
        name: '旧通気口の図面',
        description: '古民家の古い設計図。展示室の壁内部に“旧通気口”が残っていることがわかる重要な資料。',
        image: 'evidence_map.png'
    },

    {
        id: 'stand_photo',
        name: '展示台の写真',
        description: '川嶋が撮影した展示台の写真。台が微妙に斜めになっており、事前に押し動かされていた痕跡が映っている。',
        image: 'evidence_paper.png'
    },

    {
        id: 'repair_log',
        name: '修繕記録',
        description: '石動が提出した通気口修繕の記録。釘を四隅に打ったと証言しているが、実際は「2本」しか使われていない矛盾の決定的証拠。',
        image: 'evidence_report.png'
    },


    // ===============================
    // ☆フェイク証拠（ミスリード）
    // ===============================

    {
        id: 'tourist_pamphlet',
        name: '観光パンフレット',
        description: '古民家の観光パンフレット。事件とは直接関連がなく、証拠としては役に立たない。',
        image: 'evidence_paper.png'
    },

    {
        id: 'circle_attendance',
        name: '歴史サークル出欠表',
        description: '大学生・川嶋のサークル出欠記録。事件当日の行動とは関係せず、無関係な書類である。',
        image: 'evidence_paper.png'
    }

];
