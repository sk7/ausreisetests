AFFECTED=`cat $1 | jq -c '.[]'`
cat $2 | jq -c "
    .name += \"_affected\" |
    .features |= [
        .[] |
        select(
            .properties.name as \$name |
            $AFFECTED |
            index(\$name)
        )
    ]
    " > $3
