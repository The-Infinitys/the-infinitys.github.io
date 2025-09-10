use std::env;
use std::process;

// 五格を計算する構造体
struct FiveGrades {
    celestial: usize,
    human: usize,
    earth: usize,
    external: usize,
    total: usize,
}

// 五格ごとの吉凶判定結果を格納
struct GradeFortunes {
    celestial: String,
    human: String,
    earth: String,
    external: String,
    total: String,
}

// 占いの結果をより詳細に表示する構造体
struct Fortune {
    grades: FiveGrades,
    grade_fortunes: GradeFortunes,
    family_luck: String,
    gender_insights: String,
}

// 画数から吉凶を判定する関数
fn get_fortune_by_number(number: usize) -> String {
    match number {
        // 大吉数
        1 | 3 | 5 | 8 | 13 | 15 | 16 | 21 | 23 | 24 | 25 | 31 | 32 | 33 | 35 | 37 | 39 | 41
        | 45 | 47 | 48 | 52 | 57 | 61 | 63 | 65 | 67 | 68 | 81 => "大吉".to_string(),
        // 吉数
        6 | 7 | 17 | 18 | 27 | 29 | 30 | 38 | 42 | 43 | 55 | 58 | 62 | 64 | 66 | 69 | 71 | 73
        | 75 => "吉".to_string(),
        // 凶数
        4 | 10 | 12 | 14 | 20 | 22 | 26 | 34 | 36 | 40 | 44 | 46 | 49 | 50 | 51 | 53 | 54 | 56
        | 59 | 60 | 70 | 72 | 74 | 76 | 77 | 78 | 79 | 80 => "凶".to_string(),
        // 大凶数
        9 | 11 | 19 | 28 => "大凶".to_string(),
        // その他の画数
        _ => "吉凶不明".to_string(),
    }
}
// 吉凶を示す数値から対応する文字列に変換する関数
fn get_fortune_string(fortune_type: &usize) -> String {
    match *fortune_type {
        1 => "大吉".to_string(),
        2 => "吉".to_string(),
        3 => "凶".to_string(),
        4 => "大凶".to_string(),
        _ => "吉凶不明".to_string(),
    }
}

// 姓名判断の五格を計算する関数
fn calculate_five_grades(last_names: &[usize], first_names: &[usize]) -> FiveGrades {
    let last_name_total: usize = last_names.iter().sum();
    let first_name_total: usize = first_names.iter().sum();
    let celestial = last_name_total;
    let human = last_names.last().unwrap_or(&0) + first_names.first().unwrap_or(&0);
    let earth = first_name_total;
    let total = last_name_total + first_name_total;
    let external = total - human;
    FiveGrades {
        celestial,
        human,
        earth,
        external,
        total,
    }
}

// 五格、家庭運、性別に基づいた運勢を診断する関数
fn diagnose_fortune(grades: &FiveGrades, is_male: bool) -> Fortune {
    let mut family_luck = String::new();
    let mut gender_insights = String::new();

    match get_fortune_by_number(grades.human).as_str() {
        "大吉" | "吉" => family_luck
            .push_str("人格が吉数であり、配偶者との関係は良好です。円満な家庭を築けるでしょう。"),
        _ => family_luck
            .push_str("人格が不安定なため、家庭内でのコミュニケーションを心がけましょう。"),
    }

    if is_male {
        gender_insights.push_str("男性の場合、人格や総格が仕事運や社会的な成功に強く影響します。");
    } else {
        gender_insights
            .push_str("女性の場合、地格が独身時代の運勢や才能を、総格が晩年の家庭運を左右します。");
    }

    let grade_fortunes = GradeFortunes {
        celestial: get_fortune_by_number(grades.celestial),
        human: get_fortune_by_number(grades.human),
        earth: get_fortune_by_number(grades.earth),
        external: get_fortune_by_number(grades.external),
        total: get_fortune_by_number(grades.total),
    };

    Fortune {
        grades: FiveGrades { ..*grades },
        grade_fortunes,
        family_luck,
        gender_insights,
    }
}

// 引数からusizeのVecを解析するヘルパー関数
fn parse_usize_vec(arg: &str) -> Vec<usize> {
    arg.split(',')
        .filter_map(|s| s.trim().parse::<usize>().ok())
        .collect()
}

// 引数の使い方を表示するヘルパー関数
fn print_usage() {
    println!("使い方:");
    println!("  診断モード: cargo run diagnose <名字の画数(カンマ区切り)> <名前の画数(カンマ区切り)> [male]");
    println!("    例: cargo run -- diagnose 3,5 7,3");
    println!("    例: cargo run -- diagnose 3,5 4,9 male");
    println!("  画数検索モード: cargo run lookup <celestial_fortune> <human_fortune> <earth_fortune> <external_fortune> <total_fortune> <max>");
    println!("    <fortune> : 吉凶を示す数値 (1=大吉, 2=吉, 3=凶, 4=大凶, 0=任意)");
    println!("    <max> : 最大検索件数 (例: 10)");
    println!("    例: 全て大吉の組み合わせを検索 -> cargo run -- lookup 1 1 1 1 1 10");
    println!(
        "    例: 人格と総格が大吉で、他は任意の組み合わせ -> cargo run -- lookup 0 1 0 0 1 10"
    );
}

// main関数
fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        print_usage();
        process::exit(1);
    }

    let command = &args[1];

    match command.as_str() {
        "diagnose" => {
            if args.len() < 4 {
                eprintln!("エラー: 診断モードには名字と名前の画数が必要です。");
                print_usage();
                process::exit(1);
            }

            let last_names = parse_usize_vec(&args[2]);
            let first_names = parse_usize_vec(&args[3]);
            let is_male = args.get(4).map(|s| s == "male").unwrap_or(false);

            if last_names.is_empty() || first_names.is_empty() {
                eprintln!("エラー: 正しい画数が入力されていません。");
                print_usage();
                process::exit(1);
            }

            let grades = calculate_five_grades(&last_names, &first_names);
            let fortune = diagnose_fortune(&grades, is_male);

            println!("--- 姓名判断の結果 ---");
            println!(
                "天格 (名字の総画数): {} ({})",
                fortune.grades.celestial, fortune.grade_fortunes.celestial
            );
            println!(
                "人格 (内面の性格): {} ({})",
                fortune.grades.human, fortune.grade_fortunes.human
            );
            println!(
                "地格 (基礎運): {} ({})",
                fortune.grades.earth, fortune.grade_fortunes.earth
            );
            println!(
                "外格 (対人関係): {} ({})",
                fortune.grades.external, fortune.grade_fortunes.external
            );
            println!(
                "総格 (一生の運勢): {} ({})",
                fortune.grades.total, fortune.grade_fortunes.total
            );

            println!("\n--- 詳細な運勢 ---");
            println!("家庭運: {}", fortune.family_luck);
            println!("性別ごとの診断: {}", fortune.gender_insights);
        }
        "lookup" => {
            if args.len() != 8 {
                eprintln!("エラー: 検索モードには5つの吉凶タイプと最大検索数が必要です。");
                print_usage();
                process::exit(1);
            }

            let celestial_type: usize = args[2].parse().unwrap_or_else(|_| {
                eprintln!("エラー: 天格の吉凶が不正です。");
                process::exit(1);
            });
            let human_type: usize = args[3].parse().unwrap_or_else(|_| {
                eprintln!("エラー: 人格の吉凶が不正です。");
                process::exit(1);
            });
            let earth_type: usize = args[4].parse().unwrap_or_else(|_| {
                eprintln!("エラー: 地格の吉凶が不正です。");
                process::exit(1);
            });
            let external_type: usize = args[5].parse().unwrap_or_else(|_| {
                eprintln!("エラー: 外格の吉凶が不正です。");
                process::exit(1);
            });
            let total_type: usize = args[6].parse().unwrap_or_else(|_| {
                eprintln!("エラー: 総格の吉凶が不正です。");
                process::exit(1);
            });
            let max_count: usize = args[7].parse().unwrap_or_else(|_| {
                eprintln!("エラー: 無効な最大検索数です。");
                process::exit(1);
            });

            println!(
                "指定された条件に合致する画数の組み合わせを最大 {} 件検索します...",
                max_count
            );

            let mut count = 0;
            for last1 in 1..=30 {
                for last2 in 1..=30 {
                    for first1 in 1..=30 {
                        for first2 in 1..=30 {
                            let last_names = vec![last1, last2];
                            let first_names = vec![first1, first2];
                            let grades = calculate_five_grades(&last_names, &first_names);

                            let celestial_ok = celestial_type == 0
                                || get_fortune_by_number(grades.celestial)
                                    == get_fortune_string(&celestial_type);
                            let human_ok = human_type == 0
                                || get_fortune_by_number(grades.human)
                                    == get_fortune_string(&human_type);
                            let earth_ok = earth_type == 0
                                || get_fortune_by_number(grades.earth)
                                    == get_fortune_string(&earth_type);
                            let external_ok = external_type == 0
                                || get_fortune_by_number(grades.external)
                                    == get_fortune_string(&external_type);
                            let total_ok = total_type == 0
                                || get_fortune_by_number(grades.total)
                                    == get_fortune_string(&total_type);

                            if celestial_ok && human_ok && earth_ok && external_ok && total_ok {
                                println!("名字の画数: {:?}, 名前の画数: {:?}, 天格:{} 人格:{} 地格:{} 外格:{} 総格:{}", 
                                    last_names, first_names,
                                    get_fortune_by_number(grades.celestial),
                                    get_fortune_by_number(grades.human),
                                    get_fortune_by_number(grades.earth),
                                    get_fortune_by_number(grades.external),
                                    get_fortune_by_number(grades.total)
                                );
                                count += 1;
                            }

                            if count >= max_count {
                                return;
                            }
                        }
                    }
                }
            }
            println!("検索を終了しました。");
        }
        _ => {
            eprintln!("エラー: 無効なコマンドです。");
            print_usage();
            process::exit(1);
        }
    }
}
