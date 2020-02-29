const citys: City[] = [
  { "id": 1, "name": "广西壮族自治区", "pid": -1, "py": "AXZZZZO|ANXIZHUANGZUZIZHIOU" },
  { "id": 2, "name": "南宁市", "pid": 1, "py": "NNS|NANINGSHI", location: [108.363911, 22.811535] },
  { "id": 3, "name": "桂林市", "pid": 1, "py": "GLS|GUILINSHI" },
  { "id": 4, "name": "柳州市", "pid": 1, "py": "LZS|LIUZHOUSHI" },
  { "id": 10, "name": "河池市", "pid": 1, "py": "HCS|HECHISHI" },
  { "id": 12, "name": "贵港市", "pid": 1, "py": "GGS|GUIGANGSHI" },
  { "id": 13, "name": "百色市", "pid": 1, "py": "BSS|BAISESHI" },
  { "id": 59, "name": "邕宁区", "pid": 2, "py": "YNO|YONGNINGOU" },
  { "id": 61, "name": "武鸣区", "pid": 2, "py": "WMO|WUMINGOU" },
  { "id": 62, "name": "隆安县", "pid": 2, "py": "LAX|LONGANXIAN" },
  { "id": 63, "name": "马山县", "pid": 2, "py": "MSX|MASHANXIAN" },
  { "id": 64, "name": "上林县", "pid": 2, "py": "SLX|SHANGLINXIAN" },
  { "id": 65, "name": "宾阳县", "pid": 2, "py": "BYX|BINYANGXIAN" },
  { "id": 66, "name": "横县", "pid": 2, "py": "HX|HENGXIAN" },
  { "id": 67, "name": "柳江区", "pid": 4, "py": "LJO|LIUJIANGOU" },
  { "id": 68, "name": "柳城县", "pid": 4, "py": "LCX|LIUCHENGXIAN" },
  { "id": 69, "name": "梧州市", "pid": 1, "py": "WZS|WUZHOUSHI" },
  { "id": 70, "name": "北海市", "pid": 1, "py": "BHS|BEIHAISHI" },
  { "id": 71, "name": "防城港市", "pid": 1, "py": "FCGS|FANGCHENGGANGSHI" },
  { "id": 72, "name": "钦州市", "pid": 1, "py": "QZS|QINZHOUSHI" },
  { "id": 74, "name": "贺州市", "pid": 1, "py": "HZS|HEZHOUSHI" },
  { "id": 75, "name": "来宾市", "pid": 1, "py": "LBS|LAIBINSHI" },
  { "id": 77, "name": "崇左市", "pid": 1, "py": "CZS|CHONGZUOSHI" },
  { "id": 78, "name": "玉林市", "pid": 1, "py": "YLS|YULINSHI" },
  { "id": 79, "name": "鹿寨县", "pid": 4, "py": "LZX|LUZHAIXIAN" },
  { "id": 80, "name": "融安县", "pid": 4, "py": "RAX|RONGANXIAN" },
  { "id": 81, "name": "融水苗族自治县", "pid": 4, "py": "RSMZZZX|RONGSHUIMIAOZUZIZHIXIAN" },
  { "id": 82, "name": "三江侗族自治县", "pid": 4, "py": "SJDZZZX|SANJIANGDONGZUZIZHIXIAN" },
  { "id": 83, "name": "阳朔县", "pid": 3, "py": "YSX|YANGSHUOXIAN" },
  { "id": 84, "name": "临桂区", "pid": 3, "py": "LGO|LINGUIOU" },
  { "id": 85, "name": "灵川县", "pid": 3, "py": "LCX|LINGCHUANXIAN" },
  { "id": 86, "name": "全州县", "pid": 3, "py": "QZX|QUANZHOUXIAN" },
  { "id": 87, "name": "兴安县", "pid": 3, "py": "XAX|XINGANXIAN" },
  { "id": 88, "name": "永福县", "pid": 3, "py": "YFX|YONGFUXIAN" },
  { "id": 89, "name": "灌阳县", "pid": 3, "py": "GYX|GUANYANGXIAN" },
  { "id": 90, "name": "龙胜各族自治县", "pid": 3, "py": "LSGZZZX|LONGSHENGGEZUZIZHIXIAN" },
  { "id": 91, "name": "资源县", "pid": 3, "py": "ZYX|ZIYUANXIAN" },
  { "id": 92, "name": "平乐县", "pid": 3, "py": "PLX|PINGLEXIAN" },
  { "id": 93, "name": "荔浦县", "pid": 3, "py": "LPX|LIPUXIAN" },
  { "id": 94, "name": "恭城瑶族自治县", "pid": 3, "py": "GCYZZZX|GONGCHENGYAOZUZIZHIXIAN" },
  { "id": 95, "name": "岑溪市", "pid": 69, "py": "CXS|CENXISHI" },
  { "id": 96, "name": "苍梧县", "pid": 69, "py": "CWX|CANGWUXIAN" },
  { "id": 97, "name": "藤县", "pid": 69, "py": "TX|TENGXIAN" },
  { "id": 98, "name": "蒙山县", "pid": 69, "py": "MSX|MENGSHANXIAN" },
  { "id": 99, "name": "合浦县", "pid": 70, "py": "GPX|GEPUXIAN" },
  { "id": 100, "name": "东兴市", "pid": 71, "py": "DXS|DONGXINGSHI" },
  { "id": 101, "name": "上思县", "pid": 71, "py": "SSX|SHANGSAIXIAN" },
  { "id": 102, "name": "灵山县", "pid": 72, "py": "LSX|LINGSHANXIAN" },
  { "id": 103, "name": "浦北县", "pid": 72, "py": "PBX|PUBEIXIAN" },
  { "id": 104, "name": "桂平市", "pid": 12, "py": "GPS|GUIPINGSHI" },
  { "id": 105, "name": "平南县", "pid": 12, "py": "PNX|PINGNAXIAN" },
  { "id": 106, "name": "覃塘区", "pid": 12, "py": "QTO|QINTANGOU" },
  { "id": 107, "name": "北流市", "pid": 78, "py": "BLS|BEILIUSHI" },
  { "id": 108, "name": "陆川县", "pid": 78, "py": "LCX|LIUCHUANXIAN" },
  { "id": 109, "name": "容县", "pid": 78, "py": "RX|RONGXIAN" },
  { "id": 110, "name": "博白县", "pid": 78, "py": "BBX|BOBAIXIAN" },
  { "id": 111, "name": "兴业县", "pid": 78, "py": "XYX|XINGYEXIAN" },
  { "id": 112, "name": "田东县", "pid": 13, "py": "TDX|TIANDONGXIAN" },
  { "id": 113, "name": "田阳县", "pid": 13, "py": "TYX|TIANYANGXIAN" },
  { "id": 114, "name": "平果县", "pid": 13, "py": "PGX|PINGGUOXIAN" },
  { "id": 115, "name": "德保县", "pid": 13, "py": "DBX|DEBAOXIAN" },
  { "id": 116, "name": "靖西市", "pid": 13, "py": "JXS|JINGXISHI" },
  { "id": 117, "name": "那坡县", "pid": 13, "py": "NPX|NAPOXIAN" },
  { "id": 118, "name": "凌云县", "pid": 13, "py": "LYX|LINGYUNXIAN" },
  { "id": 119, "name": "乐业县", "pid": 13, "py": "LYX|LEYEXIAN" },
  { "id": 120, "name": "田林县", "pid": 13, "py": "TLX|TIANLINXIAN" },
  { "id": 121, "name": "隆林各族自治县", "pid": 13, "py": "LLGZZZX|LONGLINGEZUZIZHIXIAN" },
  { "id": 122, "name": "西林县", "pid": 13, "py": "XLX|XILINXIAN" },
  { "id": 123, "name": "昭平县", "pid": 74, "py": "ZPX|ZHAOPINGXIAN" },
  { "id": 124, "name": "钟山县", "pid": 74, "py": "ZSX|ZHONGSHANXIAN" },
  { "id": 125, "name": "富川瑶族自治县", "pid": 74, "py": "FCYZZZX|FUCHUANYAOZUZIZHIXIAN" },
  { "id": 126, "name": "宜州区", "pid": 10, "py": "YZO|YIZHOUOU" },
  { "id": 127, "name": "南丹县", "pid": 10, "py": "NDX|NADANXIAN" },
  { "id": 128, "name": "天峨县", "pid": 10, "py": "TEX|TIANEXIAN" },
  { "id": 129, "name": "凤山县", "pid": 10, "py": "FSX|FENGSHANXIAN" },
  { "id": 130, "name": "东兰县", "pid": 10, "py": "DLX|DONGLANXIAN" },
  { "id": 131, "name": "巴马瑶族自治县", "pid": 10, "py": "BMYZZZX|BAMAYAOZUZIZHIXIAN" },
  { "id": 132, "name": "都安瑶族自治县", "pid": 10, "py": "DAYZZZX|DOUANYAOZUZIZHIXIAN" },
  { "id": 133, "name": "大化瑶族自治县", "pid": 10, "py": "DHYZZZX|DAHUAYAOZUZIZHIXIAN" },
  { "id": 134, "name": "环江毛南族自治县", "pid": 10, "py": "HJMNZZZX|HUANJIANGMAONAZUZIZHIXIAN" },
  { "id": 135, "name": "罗城仫佬族自治县", "pid": 10, "py": "LCMLZZZX|LUOCHENGMULAOZUZIZHIXIAN" },
  { "id": 136, "name": "金城江区", "pid": 10, "py": "JCJO|JINCHENGJIANGOU" },
  { "id": 137, "name": "忻城县", "pid": 75, "py": "XCX|XINCHENGXIAN" },
  { "id": 138, "name": "武宣县", "pid": 75, "py": "WXX|WUXUANXIAN" },
  { "id": 139, "name": "象州县", "pid": 75, "py": "XZX|XIANGZHOUXIAN" },
  { "id": 140, "name": "兴宾区", "pid": 75, "py": "XBO|XINGBINOU" },
  { "id": 141, "name": "金秀瑶族自治县", "pid": 75, "py": "JXYZZZX|JINXIUYAOZUZIZHIXIAN" },
  { "id": 142, "name": "合山市", "pid": 75, "py": "GSS|GESHANSHI" },
  { "id": 144, "name": "宁明县", "pid": 77, "py": "NMX|NINGMINGXIAN" },
  { "id": 145, "name": "扶绥县", "pid": 77, "py": "FSX|FUSUIXIAN" },
  { "id": 146, "name": "龙州县", "pid": 77, "py": "LZX|LONGZHOUXIAN" },
  { "id": 147, "name": "大新县", "pid": 77, "py": "DXX|DAXINXIAN" },
  { "id": 148, "name": "天等县", "pid": 77, "py": "TDX|TIANDENGXIAN" },
  { "id": 149, "name": "江洲区", "pid": 77, "py": "JZO|JIANGZHOUOU" },
  { "id": 150, "name": "凭祥市", "pid": 1, "py": "PXS|PINGXIANGSHI" },
  { "id": 171, "name": "黑龙江", "pid": -1, "py": "HLJ|HEILONGJIANG" },
  { "id": 225, "name": "防城区", "pid": 71, "py": "FCO|FANGCHENGOU" },
  { "id": 226, "name": "港口区", "pid": 71, "py": "GKO|GANGKOUOU" },
  { "id": 230, "name": "青秀区", "pid": 2, "py": "QXO|QINGXIUOU" },
  { "id": 231, "name": "西乡塘区", "pid": 2, "py": "XXTO|XIXIANGTANGOU" },
  { "id": 232, "name": "江南区", "pid": 2, "py": "JNO|JIANGNAOU" },
  { "id": 233, "name": "兴宁区", "pid": 2, "py": "XNO|XINGNINGOU" },
  { "id": 234, "name": "良庆区", "pid": 2, "py": "LQO|LIANGQINGOU" },
  { "id": 235, "name": "叠彩区", "pid": 3, "py": "DCO|DIECAIOU" },
  { "id": 236, "name": "七星区", "pid": 3, "py": "QXO|QIXINGOU" },
  { "id": 237, "name": "象山区", "pid": 3, "py": "XSO|XIANGSHANOU" },
  { "id": 238, "name": "秀峰区", "pid": 3, "py": "XFO|XIUFENGOU" },
  { "id": 239, "name": "雁山区", "pid": 3, "py": "YSO|YANSHANOU" },
  { "id": 240, "name": "城中区", "pid": 4, "py": "CZO|CHENGZHONGOU" },
  { "id": 241, "name": "柳州新区", "pid": 4, "py": "LZXO|LIUZHOUXINOU" },
  { "id": 242, "name": "柳北区", "pid": 4, "py": "LBO|LIUBEIOU" },
  { "id": 243, "name": "柳东区", "pid": 4, "py": "LDO|LIUDONGOU" },
  { "id": 244, "name": "柳南区", "pid": 4, "py": "LNO|LIUNAOU" },
  { "id": 245, "name": "鱼峰区", "pid": 4, "py": "YFO|YUFENGOU" },
  { "id": 246, "name": "银海区", "pid": 70, "py": "YHO|YINHAIOU" },
  { "id": 247, "name": "海城区", "pid": 70, "py": "HCO|HAICHENGOU" },
  { "id": 248, "name": "万秀区", "pid": 69, "py": "MXO|MOXIUOU" },
  { "id": 250, "name": "长洲区", "pid": 69, "py": "CZO|CHANGZHOUOU" },
  { "id": 251, "name": "铁山港区", "pid": 70, "py": "TSGO|TIESHANGANGOU" },
  { "id": 252, "name": "钦南区", "pid": 72, "py": "QNO|QINNAOU" },
  { "id": 253, "name": "钦北区", "pid": 72, "py": "QBO|QINBEIOU" },
  { "id": 254, "name": "钦州港区", "pid": 72, "py": "QZGO|QINZHOUGANGOU" },
  { "id": 256, "name": "港南区", "pid": 12, "py": "GNO|GANGNAOU" },
  { "id": 257, "name": "港北区", "pid": 12, "py": "GBO|GANGBEIOU" },
  { "id": 258, "name": "玉州区", "pid": 78, "py": "YZO|YUZHOUOU" },
  { "id": 259, "name": "福绵管理区", "pid": 78, "py": "FMGLO|FUMIANGUANLIOU" },
  { "id": 260, "name": "右江区", "pid": 13, "py": "YJO|YOUJIANGOU" },
  { "id": 263, "name": "平桂管理区", "pid": 74, "py": "PGGLO|PINGGUIGUANLIOU" },
  { "id": 264, "name": "八步区", "pid": 74, "py": "BBO|BABUOU" },
  { "id": 291, "name": "龙圩区", "pid": 69, "py": "LWO|LONGWEIOU" },
]

export default citys