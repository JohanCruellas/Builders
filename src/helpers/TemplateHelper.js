function AxisTemplateSave(templatesToModify, axisTemplate, lang) {
    templatesToModify.forEach((template) => {
        //Save name changes
        template.categories.forEach((cat, catIndex) => {
            cat.text[lang] = axisTemplate[catIndex].label;
            cat.children.forEach((child, childIndex) => {
                child.text = axisTemplate[catIndex].stakes[childIndex].label;
            })

            //Add if new stake
            let nbAddedStakes = axisTemplate[catIndex].stakes.length - cat.children.length;
            let stakeLength = cat.children.length;
            for (let i = 0; i < nbAddedStakes; i++) {
                template.categories[catIndex].children.push({
                    text: {[lang]: axisTemplate[catIndex].stakes[stakeLength + i].label},
                    children: []
                })
            }
        })

        //Add if new axis
        let nbAddedAxis = axisTemplate.length - template.categories.length;
        let templateLength = template.categories.length;
        for (let i = 0; i < nbAddedAxis; i++) {
            template.categories.push({
                text: {[lang]: axisTemplate[templateLength + i].label},
                id: self.crypto.randomUUID(),
                children: axisTemplate[templateLength + i].stakes.map((stake) => {
                    return {
                        text: {[lang]: stake.label},
                        children: []
                    }
                })
            })
        }
    })
}

export { AxisTemplateSave }