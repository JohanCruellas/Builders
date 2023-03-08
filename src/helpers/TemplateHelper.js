function AxisTemplateSave(templatesToModify, axisTemplate) {
    templatesToModify.forEach((template) => {
        // template.categories.forEach((cat, catIndex) => {
        //     cat.text = axisTemplate[catIndex].label;
        //     cat.children.forEach((child, childIndex) => {
        //         child.text = axisTemplate[catIndex].stakes[childIndex].label;
        //     })

        //     let nbAddedStakes = axisTemplate[catIndex].stakes.length - cat.children.length;
        //     let stakeLength = cat.children.length;
        //     for (let i = 0; i < nbAddedStakes; i++) {
        //         template.categories[catIndex].children.push({
        //             text: axisTemplate[catIndex].stakes[stakeLength + i].label,
        //             questions: []
        //         })
        //     }
        // })

        // let nbAddedAxis = axisTemplate.length - template.categories.length;
        // let templateLength = template.categories.length;
        // for (let i = 0; i < nbAddedAxis; i++) {
        //     template.categories.push({
        //         text: axisTemplate[templateLength + i].label,
        //         children: axisTemplate[templateLength + i].stakes.map((stake) => {
        //             return {
        //                 text: stake.label,
        //                 questions: []
        //             }
        //         })
        //     })
        // }

        
    })
}

export { AxisTemplateSave }