all:
	npm run build
	rsync -avz --delete --progress \
		-e "ssh -p 49375" \
		./dist/ root@30dc18b4df78.vps.myjino.ru:/var/www/html/

lines_all:
	find . -name "*.vue" -print0 | xargs -0 cat | wc -l

lines_no_style:
	find . -name "*.vue" -print0 \
	  | xargs -0 awk '\
	    /<style/ { in_style=1 }\
	    /<\/style/ { in_style=0; next }\
	    !in_style { count++ }\
	    END { print count }'

lines_no_style_template:
	find . -name "*.vue" -print0 \
	  | xargs -0 awk '\
	    /<style/ { in_style=1 }\
	    /<\/style/ { in_style=0; next }\
	    /<template/ { in_template=1 }\
	    /<\/template/ { in_template=0; next }\
	    !in_style && !in_template { count++ }\
	    END { print count }'