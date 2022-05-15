web: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 build/src/index.js
release: node node_modules/typeorm/cli.js migration:run
