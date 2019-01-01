const languages = {
    cn: {
        pageLength: '每页记录数 ',
        pageInfo: `当前显示第 #pageNumber# / #totalPage# 页（共#totalRow#条记录）`,
        first: '<<',
        previous: '<',
        next: '>',
        last: '>>'
    },
    en: {
        pageLength: 'Page length ',
        pageInfo: 'Current #pageNumber# / #totalPage# （total #totalRow# records）',
        first: '<<',
        previous: '<',
        next: '>',
        last: '>>'
    },
    jp: {
        pageLength: 'ページごとの記録数',
        pageInfo: '現在の第 #pageNumber# / #totalPage# ページ（全部で #totalRow# 条の記録）',
        first: 'トップページ',
        previous: '«',
        next: '»',
        last: '尾のページ'
    }
};

const defaults = {
    totalRow: 0,
    info: true,
    pageSizeMenu: [10,20,50,100],
    language: 'cn',
    align: 'right'
};

export default {
    languages,
    defaults
};