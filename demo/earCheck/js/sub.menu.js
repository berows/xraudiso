document.addEventListener('DOMContentLoaded', () => {
    function getTextByFileName(fileName) {
        const textConfig = {
            tech: {
                subtitle: '기술',
                titles: {
                    '01': '가상현실(확장현실) 기술',
                    '02': '디지털진단솔루션',
                    '03': 'VR기반 수술훈련',
                    '04': '모바일 헬스케어'
                }
            },
            product: {
                subtitle: '제품',
                titles: {
                    '01': 'VR 전정기능 재활훈련 치료앱',
                    '02': '순음청력검사 VR',
                    '03': '이석증 진단 치료 교육 VR',
                    '04': '측두골 수술 시뮬레이터 VR',
                    '05': '키오스크 가상현실 기기'
                }
            },
            exam: {
                subtitle: '검사',
                titles: {
                    '01': '간이청력검사',
                }
            },
            ear: {
                subtitle: '기술데모',
                titles: {
                    '01': 'AI 귀 건강 분석'
                }
            }
        };

        const match = fileName.match(/^([a-zA-Z]+)_?(\d{2})?$/);
        if (match) {
            const [_, category, id] = match;
            if (textConfig[category]) {
                const subtitle = textConfig[category].subtitle;
                const maintitle = id ? textConfig[category].titles[id] : undefined;
                return { subtitle, maintitle };
            }
        }
        return { subtitle: '알 수 없음', maintitle: '알 수 없음' };
    }

    const fileName = window.location.pathname.split('/').pop().split('.')[0];
    const { subtitle, maintitle } = getTextByFileName(fileName);

    document.querySelector('.sub_banner_text .subtitle').textContent = subtitle || '';
    document.querySelector('.sub_banner_text .maintitle').textContent = maintitle || '';
    document.querySelector('.subnav_wrap .nav-area .subtitle ').textContent = subtitle || '';
    document.querySelector('.subnav_wrap .nav-area .maintitle ').textContent = maintitle || '';
});
